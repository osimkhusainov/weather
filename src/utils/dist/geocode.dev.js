"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var request = require("postman-request");

var getLocationInfo = function getLocationInfo(address, callback) {
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(address), ".json?access_token=pk.eyJ1Ijoib3NpbSIsImEiOiJja3kwZThzcjAwMHZuMnBwYzQwYWd4bjhqIn0.RPrfGgUIjdKtPxJm_1LU4g&limit=1");
  request({
    url: url,
    json: true
  }, function (err, res) {
    if (err) {
      callback("Ethernet is not available", undefined);
      return;
    } else if (res.body.message || res.body.features.length === 0) {
      callback("Invalid address, please, try again in english.", undefined);
      return;
    }

    var _res$body$features = _slicedToArray(res.body.features, 1),
        data = _res$body$features[0];

    var placeName = data.place_name;

    var _data$geometry$coordi = _slicedToArray(data.geometry.coordinates, 2),
        log = _data$geometry$coordi[0],
        lat = _data$geometry$coordi[1];

    callback(undefined, {
      location: placeName,
      latitude: lat,
      longitude: log
    });
  });
};

module.exports = getLocationInfo;