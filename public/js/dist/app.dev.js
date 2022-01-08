"use strict";

var url = function url(city) {
  return "/weather?address=".concat(city);
};

var weatherForm = document.querySelector("form");
var input = document.querySelector("input");
var messageOne = document.querySelector("#message-1");
var messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var value = input.value;

  if (!value) {
    input.style.borderColor = "red";
    messageOne.textContent = "Please, write location";
    messageOne.style.color = "red";
    return;
  }

  input.style.borderColor = "";
  messageOne.style.color = "";
  messageOne.textContent = "Loading...";

  function getWeather(url1) {
    var response, data;
    return regeneratorRuntime.async(function getWeather$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch(url(url1)));

          case 3:
            response = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            data = _context.sent;

            if (!data.error) {
              _context.next = 11;
              break;
            }

            messageOne.textContent = data.error;
            messageTwo.textContent = "";
            return _context.abrupt("return");

          case 11:
            if (!(data.location === undefined || data.forecast === undefined)) {
              _context.next = 15;
              break;
            }

            messageOne.textContent = "Invalid address, please, try again in english.";
            messageTwo.textContent = "";
            return _context.abrupt("return");

          case 15:
            messageOne.textContent = "Region: ".concat(data.location);
            messageTwo.textContent = "Forecast: ".concat(data.forecast);
            _context.next = 24;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            messageOne.textContent = _context.t0;
            messageTwo.textContent = "";

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 19]]);
  }

  getWeather(value);
  input.value = "";
});