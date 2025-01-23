const insertDataIntoLocation = async (client) => {
  await client.query(
    `INSERT INTO location (name, latitude, longitude) VALUES ('Kathmandu', 40.7128, -74.0060)`
  );
  await client.query(
    `INSERT INTO location (name, latitude, longitude) VALUES ('Pokhara', 51.5074, -0.1278)`
  );
  await client.query(
    `INSERT INTO location (name, latitude, longitude) VALUES ('Lalitpur', 35.6895, 139.6917)`
  );
};

const insertDataIntoWeatherRealTime = async (client) => {
  await client.query(
    `INSERT INTO weather_realtime (location_id, temperature, condition, humidity, wind_speed) VALUES (1, 28, 'Sunny', 80, 10)`
  );
  await client.query(
    `INSERT INTO weather_realtime (location_id, temperature, condition, humidity, wind_speed) VALUES (2, 12, 'Rainy', 60, 5)`
  );
  await client.query(
    `INSERT INTO weather_realtime (location_id, temperature, condition, humidity, wind_speed) VALUES (3, 30, 'Cloudy', 70, 8)`
  );
};

const insertDataIntoWeatherForecast = async (client) => {
  // give me 3 days from now data to insert into weather forecase

  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-24', 1 , 15, 25, 'Sunny')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-25', 1 , 10, 20, 'Rainy')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-26', 1 , 12, 22, 'Cloudy')`
  );

  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-24', 2 , 15, 25, 'Sunny')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-25', 2 , 10, 20, 'Rainy')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-26', 2 , 12, 22, 'Cloudy')`
  );

  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-24', 3 , 15, 25, 'Sunny')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-25', 3 , 10, 20, 'Rainy')`
  );
  await client.query(
    `INSERT INTO weather_forecast (date, location_id, min_temp, max_temp, condition) VALUES ('2025-01-26', 3 , 12, 22, 'Cloudy')`
  );
  // for location_id two

  // now add location_id also and write query
};

const insertDataIntoAirQuality = async (client) => {
  await client.query(
    `INSERT INTO air_quality (location_id, aqi, description) VALUES (1, 50, 'Good')`
  );
  await client.query(
    `INSERT INTO air_quality (location_id, aqi, description) VALUES (2, 100, 'Very Unhealthy')`
  );
  await client.query(
    `INSERT INTO air_quality (location_id, aqi, description) VALUES (3, 150, 'Hazardous')`
  );
};

module.exports = {
  insertDataIntoAirQuality,
  insertDataIntoLocation,
  insertDataIntoWeatherForecast,
  insertDataIntoWeatherRealTime,
};
