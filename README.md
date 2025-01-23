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

```
{
 "weather_forecast" : {

 },
 "weather_realtime": {

 },
 "air_quality": {

 }
}
```
