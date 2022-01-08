const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecats = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Osim Khusainov",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Osim Khusainov",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Osim Khusainov",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address not available" });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecats(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ err });
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Page not found.",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is up on port 3000.");
});
