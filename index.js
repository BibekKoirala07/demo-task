require("dotenv").config();
const http = require("http");
const tableCreated = require("./utils/query");
const { dbConnect, query } = require("./database/pool");
const { getWeatherLocation } = require("./controllers/get-weather-location");
const getWeatherRealTime = require("./controllers/get-weather-realtime");
const getWeatherForecast = require("./controllers/get-weather-forecase");
// const db = require("./database/pool");

const checkForLocation = (location, res) => {
  if (!location) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Location is required" }));
    res.end();
    return;
  }
};

const getLocationIdFromLocationName = async (location, res) => {
  const getLocation = await query(`SELECT * FROM location WHERE name = $1`, [
    location,
  ]);

  if (getLocation.rowCount === 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Location not found" }));
    res.end();
    return;
  }

  return getLocation.rows[0].id;
};

const server = http.createServer(async (req, res) => {
  console.log("req", req.method, req.url);
  const [finalRequest, queryParameters] = req.url.split("?");
  const queryParams = new URLSearchParams(queryParameters);

  const location = queryParams.get("location");
  console.log("finalRequest: " + finalRequest);

  if (req.method === "GET" && finalRequest == "/weather/realtime") {
    checkForLocation(location, res);
    const locationId = await getLocationIdFromLocationName(location, res);
    await getWeatherRealTime(req, res, query, locationId);
  }
  // yo get weather/airquality
  else if (req.method === "GET" && finalRequest === "/weather/airquality") {
    checkForLocation(location, res);
    const locationId = await getLocationIdFromLocationName(location, res);

    console.log("locationId: " + locationId);

    const getAirQualityData = await query(
      `SELECT * FROM air_quality WHERE location_id = $1`,
      [locationId]
    );

    if (getAirQualityData.rowCount === 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Air quality data not found" }));
      res.end();
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(getAirQualityData.rows));
    res.end();
  } else if (req.method == "GET" && finalRequest === "/weather/forecast") {
    await checkForLocation(location, res);
    const locationId = await getLocationIdFromLocationName(location, res);

    // get today's date and upto 3 days
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const threeDaysFromToday = new Date(today);
    threeDaysFromToday.setDate(today.getDate() + 3);
    const dateThreeDaysFromToday = threeDaysFromToday
      .toISOString()
      .split("T")[0];
    // write a query
    const getWeatherForecastData = await query(
      `SELECT * FROM weather_forecast WHERE location_id = $1 AND date BETWEEN $2 AND $3`,
      [locationId, date, dateThreeDaysFromToday]
    );
    console.log("get WeatherForecastData not found", getWeatherForecastData);

    if (getWeatherForecastData.rowCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Weather forecast data not found" }));
      res.end();
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(getWeatherForecastData.rows));
    res.end();
  } else if (req.method === "GET" && finalRequest === "/weather/location") {
    await getWeatherLocation(req, res, query);
  }
  // you chai post weather generate
  else if (req.method === "POST" && finalRequest === "/weather/generate") {
    {
      const weatherForecast = JSON.parse(req.body).weather_forecast;
      const { location_id, date, min_temp, max_temp, condition } =
        weatherForecast;

      if (!location_id || !date || !min_temp || !max_temp || !condition) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            error: "All fields are required in weather_forecast",
          })
        );
        res.end();
        return;
      }

      await query(
        `INSERT INTO weather_forecast (location_id, date, min_temp, max_temp, condition) VALUES ($1, $2, $3, $4, $5)`,
        [location_id, date, min_temp, max_temp, condition]
      );
    }

    {
      const weatherRealTime = JSON.parse(req.body).weather_realtime;
      const { location_id, temperature, condition, humidity, wind_speed } =
        weatherRealTime;
      // all fields are required
      if (
        !location_id ||
        !temperature ||
        !condition ||
        !humidity ||
        !wind_speed
      ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            error: "All fields are required in weather_realtime",
          })
        );
        res.end();
        return;
      }
      await query(
        `INSERT INTO weather_realtime (location_id, temperature, condition, humidity, wind_speed) VALUES ($1, $2, $3, $4, $5)`,
        [location_id, temperature, condition, humidity, wind_speed]
      );
    }

    {
      const airQuality = JSON.parse(req.body).air_quality;
      const { location_id, aqi, description } = airQuality;
      if (!location_id || !api || !description) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            error: "All fields are required in weather_realtime",
          })
        );
        res.end();
        return;
      }
      await query(
        `INSERT INTO air_quality (location_id, aqi, description) VALUES ($1, $2, $3)`,
        [location_id, aqi, description]
      );
    }
    // send the response that it is successfully added
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Weather data added successfully" }));
    res.end();
  }
});

const PORT = 3000;

server.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server running on port ${PORT}`);
});
