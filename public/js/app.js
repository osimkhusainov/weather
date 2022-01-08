const url = (city) => `/weather?address=${city}`;

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value) {
    input.style.borderColor = "red";
    messageOne.textContent = "Please, write location";
    messageOne.style.color = "red";
    return;
  }
  input.style.borderColor = "";
  messageOne.style.color = "";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  async function getWeather(url1) {
    try {
      const response = await fetch(url(url1));
      const data = await response.json();
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        return;
      }
      if (data.location === undefined || data.forecast === undefined) {
        messageOne.textContent = data.err;
        messageTwo.textContent = "";
        return;
      }
      messageOne.textContent = `Region: ${data.location}`;
      messageTwo.textContent = `Forecast: ${data.forecast}`;
    } catch (error) {
      console.log(error);
      messageOne.textContent = error;
      messageTwo.textContent = "";
    }
  }
  getWeather(value);
  input.value = "";
});
