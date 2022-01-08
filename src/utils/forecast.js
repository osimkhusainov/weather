const request = require("postman-request");

const forecats = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=85e5259c6f7f6a67e0cd9898311e97e9&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Ethernet is not available", undefined);
    } else if (body.error) {
      callback("Coordinates not founed", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out. But feels like ${body.current?.feelslike} temperature out.`
      );
    }
  });
};

module.exports = forecats;
