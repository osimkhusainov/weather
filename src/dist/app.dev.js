"use strict";

var path = require("path");

var express = require("express");

var hbs = require("hbs");

var geocode = require("./utils/geocode");

var forecats = require("./utils/forecast");

var app = express();
var port = process.env.PORT || 3000; // define paths for express config

var publicDirectory = path.join(__dirname, "../public");
var viewsDirectory = path.join(__dirname, "../templates/views");
var partialsPath = path.join(__dirname, "../templates/partials"); // setup handlerbars engine and views location

app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsPath); // setup static directory to serve

app.use(express["static"](publicDirectory));
app.get("", function (req, res) {
  res.render("index", {
    title: "Weather",
    name: "Osim Khusainov"
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    title: "About Me",
    name: "Osim Khusainov"
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    helpText: "Contact me:",
    title: "Contact",
    name: "Osim Khusainov"
  });
});
app.get("/weather", function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: "Address not available"
    });
  }

  geocode(req.query.address, function (err) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (err) {
      return res.status(404).send({
        err: err
      });
    }

    forecats(latitude, longitude, function (err, forecastData) {
      if (err) return res.send({
        err: err
      });
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
app.get("/contact/*", function (req, res) {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Contact article not found."
  });
});
app.get("*", function (req, res) {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Page not found."
  });
});
app.listen(port, function () {
  console.log("Server is up on port 3000.");
});