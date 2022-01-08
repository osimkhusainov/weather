const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecats = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

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

app.get("", (req, res) => {
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

app.get("/contact", (req, res) => {
  res.render("contact", {
    helpText: "Contact me:",
    title: "Contact",
    name: "Osim Khusainov",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({ error: "Invalid address" });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.status(404).send({ err });
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

app.get("/contact/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Contact article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Osim Khusainov",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
