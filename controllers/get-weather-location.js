// create weather location function without anything for now

async function getWeatherLocation(req, res, query) {
  const result = await query("SELECT * FROM location", []);
  // console.log(result);
  const data = result.rows;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = {
  getWeatherLocation,
};
