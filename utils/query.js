async function createTable(client) {
  try {
    await client.query("BEGIN");
    await client.query(createTableLocationQuery);
    await client.query(createWeatherRealTime);
    await client.query(createWeatherForecast);
    await client.query(airQualityQuery);
    await client.query("COMMIT");
    // seed the location table with dummy data

    console.log("weather forecast table created successfully");
  } catch (error) {
    console.log("error while creating weather forecast");
  }

  return true;
}

module.exports = createTable;
