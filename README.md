##### Do the following thing to make sure you can run this program

- go at root folder and make the `.env` file and put following credentials here
  POSTGRES_HOST=localhost
  POSTGRES_DB=demo
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres

  You need to have demo database in postgres for this program to work

- second type `npm install` at root folder from terminal
-

###### The location that have been seeded are

1. Kathmandu - id 1
2. Pokhara - id 2
3. Lalitpur - id 3

###### For post request

We need to send data in this way:
remember location_id should be passed in such way that it need to already exist in database
We have location_id 1, 2 and 3 already seeded

```
{
 "weather_forecast" : {
    // required fields are
    location_id, date, min_temp, max_temp, condition
 },
 "weather_realtime": {
  // following fields are required
  location_id, temperature, condition, humidity, wind_speed
 },
 "air_quality": {
    // following fields are required
    location_id, aqi, description
 }
}
```
