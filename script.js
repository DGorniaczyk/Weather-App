const inpt = document.querySelector(".search-input");
const city = document.querySelector(".city-name");
const temprvalue = document.querySelector(".temperature-value");
const whtrtext = document.querySelector(".value-text-weather");
const humtext = document.querySelector(".value-text-humidity");
const glassicon = document.querySelector(".search");
const visContainer = document.querySelector(".vis-container");

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apikey = "628a1acec03f5505d18b335238249f0d";
const units = "metric";

const getweather = () => {
  const cityvalue = inpt.value || "Poznań";
  const urlarchive = `${url}${cityvalue}&appid=${apikey}&units=${units}`;
  axios
    .get(urlarchive)
    .then((res) => {
      if (document.querySelector(".notification")) {
        const notification = document.querySelector(".notification");
        document.body.removeChild(notification);
      }
      const temperature = res.data.main.temp;
      const humidity = res.data.main.humidity;
      const weather = res.data.weather[0].main;
      const weathericonID = res.data.weather[0].id;

      city.textContent = cityvalue;
      temprvalue.textContent = Math.floor(temperature) + "°C";
      whtrtext.textContent = weather;
      humtext.textContent = humidity;
      console.log(weathericonID);
      if (weathericonID) {
        if (weathericonID >= 200 && weathericonID < 300) {
          removeElement();
          addElement(["fa-regular", "fa-cloud-bolt"]);
        } else if (weathericonID >= 300 && weathericonID < 400) {
          removeElement();
          addElement(["fa-light", "fa-cloud-drizzle"]);
        } else if (weathericonID >= 500 && weathericonID < 600) {
          removeElement();
          addElement(["fa-regular", "fa-cloud-rain"]);
        } else if (weathericonID >= 600 && weathericonID < 700) {
          removeElement();
          addElement(["fa-light", "fa-snowflake"]);
        } else if (weathericonID >= 701 && weathericonID < 800) {
          removeElement();
          addElement(["fa-light", "fa-cloud-fog"]);
        } else if (weathericonID === 800) {
          removeElement();
          addElement(["fa-sharp", "fa-light", "fa-sun"]);
        } else if (weathericonID >= 801 && weathericonID < 900) {
          removeElement();
          addElement(["fa-duotone", "fa-cloud"]);
        }
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        console.error("This city doesnt exist");
        displayNotification("City not found");
      }
    });
};

const displayNotification = (message) => {
  const createNotification = document.createElement("div");
  createNotification.classList.add("notification");
  createNotification.textContent = message;
  document.body.appendChild(createNotification);
  city.textContent = "CITY";
  temprvalue.textContent = "-°C"
  whtrtext.textContent = "-"
  humtext.textContent = "-"
  removeElement();
  addElement(["fa-sharp", "fa-light", "fa-sun"])
};

const removeElement = () => {
  const icon = document.querySelector(".wheather-icon");
  icon.remove();
};

const addElement = (className) => {
  const createVisElement = document.createElement("i");
  createVisElement.classList.add("fas", ...className, "wheather-icon");

  visContainer.appendChild(createVisElement);
};

glassicon.addEventListener("click", getweather);
