async function getWeatherForecast(req, res, query, location) {
  if (!location) {
    return res.status(400).json({ error: "location is required" });
  }
  console.log(location);

  // db.query(
  //   `SELECT * FROM weather_forecast WHERE location = $1 LIMIT 3`,
  //   [location],
  //   (err, result) => {
  //     if (err) {
  //       if (err) {
  //         console.error("Failed to fetch 3-day weather forecast:", err);
  //         return res.status(500).json({ error: "Internal server error" });
  //       }
  //       return res.status(200).json({
  //         message: "weather fetched successfully",
  //         data: result,
  //       });
  //     }
  //   }
  // );
}

module.exports = getWeatherForecast;
