const createTableLocationQuery = `
CREATE TABLE IF NOT EXISTS location (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  latitude DECIMAL(10,6) ,
  longitude DECIMAL(10,6)
)
`;

const createWeatherRealTime = `
CREATE TABLE IF NOT EXISTS weather_realtime (
  id SERIAL PRIMARY KEY,
  location_id INTEGER REFERENCES location(id),
  temperature DECIMAL NOT NULL,
  condition VARCHAR(255) NOT NULL,
  humidity INT NOT NULL,
  wind_speed DECIMAL(5,2) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createWeatherForecast = `
CREATE TABLE IF NOT EXISTS weather_forecast (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  location_id INTEGER REFERENCES location(id),
  min_temp DECIMAL(5,2) NOT NULL,
  max_temp DECIMAL(5,2) NOT NULL,
  condition VARCHAR(255) NOT NULL
)
  `;

const airQualityQuery = `
CREATE TABLE IF NOT EXISTS air_quality (
id SERIAL PRIMARY KEY,
location_id INTEGER REFERENCES location(id),
aqi INTEGER NOT NULL,
description TEXT NOT NULl
)

`;

const { Pool } = require("pg");
const {
  insertDataIntoLocation,
  insertDataIntoWeatherRealTime,
  insertDataIntoWeatherForecast,
  insertDataIntoAirQuality,
} = require("../utils/seeding");

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

console.log("POSTGRES_HOST", POSTGRES_HOST);

// const sql = postgres({
//   host: POSTGRES_HOST,
//   database: POSTGRES_DB,
//   user: POSTGRES_USER,
//   password: POSTGRES_PASSWORD,
//   port: 5432,

//   //   connectionTimeoutMillis: 5000,
//   //   idleTimeoutMillis: 30000,
//   //   max: 10, // max number of client connections
//   //   min: 1, // minimum number of client connections
//   //   connectionTimeout: 10000, // milliseconds before a connection attempt times out
// });

const db = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

const query = async (text, values) => {
  const client = await db.connect();
  try {
    const result = await client.query(text, values);
    return result;
  } finally {
    client.release();
  }
};

// function to delete everything that was in database with restarting idenity
const resetDatabase = async (client) => {
  await client.query(
    "TRUNCATE TABLE location, weather_realtime, weather_forecast, air_quality RESTART IDENTITY CASCADE;"
  );
};

const dbConnect = () => {
  db.connect()
    .then(async (client) => {
      console.log("Connected to PostgreSQL database");

      await client.query(createTableLocationQuery);
      await client.query(createWeatherRealTime);
      await client.query(createWeatherForecast);
      await client.query(airQualityQuery);

      await resetDatabase(client);

      await insertDataIntoLocation(client);
      await insertDataIntoWeatherRealTime(client);
      await insertDataIntoWeatherForecast(client);
      await insertDataIntoAirQuality(client);

      await client.release();
      console.log("All tables created successfully");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err.stack);
    });
};

module.exports = { dbConnect, query };
