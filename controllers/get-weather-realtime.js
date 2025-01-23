const getWeatherRealTime = async (req, res, query, location) => {
  const locationData = await query(`SELECT * FROM location WHERE name = $1`, [
    location,
  ]);

  if (locationData.rows.length === 0) {
    console.log("Location not found in database");
    res.writeHead(404);
    res.write(JSON.stringify({ error: "Location not found" }));
    res.end();
    return;
  }

  const locationId = locationData.rows[0].id;

  console.log("locationId: " + locationId);

  const result = await query(
    `SELECT * FROM weather_realtime WHERE location_id = $1`,
    [locationId]
  );

  if (result.rows.length === 0) {
    console.log("No real-time weather data found for", location);
    res.writeHead(404);
    res.write(JSON.stringify({ error: "No real-time weather data found" }));
    res.end();
    return;
  }

  res.writeHead(200);
  res.write(JSON.stringify(result.rows));
  res.end();
};

module.exports = getWeatherRealTime;
