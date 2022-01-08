const request = require("postman-request");

const getLocationInfo = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib3NpbSIsImEiOiJja3kwZThzcjAwMHZuMnBwYzQwYWd4bjhqIn0.RPrfGgUIjdKtPxJm_1LU4g&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Ethernet is not available", undefined);
      return;
    } else if (res.body.message || res.body.features.length === 0) {
      callback("Country not founed", undefined);
      return;
    }
    const [data] = res.body.features;
    const placeName = data.place_name;
    const [log, lat] = data.geometry.coordinates;
    callback(undefined, {
      location: placeName,
      latitude: lat,
      longitude: log,
    });
  });
};

module.exports = getLocationInfo;
