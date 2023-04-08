const API_Key = "c543f51f9f3bb35c1b2244952e3d0960";
const DaysOfTheWeek = ["sun", "mon", "tue", "wed", "thus", "fir", "sat"];
let selectedCityText;
let selectedCity;
let background = "";

const getCities = async (searchText) => {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${API_Key}`
    );
    return response.json();
};

const getCurrentWeatherData = async ({ lat, lon, name: city }) => {
    const url =
        lat && lon
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric`
            : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    const response = await fetch(url);
    return response.json();
};

const gethourlyforecast = async ({ name: city }) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=metric`
    );
    const data = await response.json();
    return data.list.map((forecast) => {
        const {
            main: { temp, temp_max, temp_min },
            dt,
            dt_txt,
            weather: [{ description, icon }],
        } = forecast;
        return { temp, temp_max, temp_min, dt, dt_txt, description, icon };
    });
};

const formatTemperature = (temp) => `${temp?.toFixed(1)}°C`;
const createIconUrl = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
const calculateDayWiseForecast = (hourlyforecast) => {
    let dayWiseForecast = new Map();
    for (let forecast of hourlyforecast) {
        const [date] = forecast.dt_txt.split(" ");
        const dayOfTheWeek = DaysOfTheWeek[new Date(date).getDay()];
        if (dayWiseForecast.has(dayOfTheWeek)) {
            let forecastForTheDay = dayWiseForecast.get(dayOfTheWeek);
            forecastForTheDay.push(forecast);
            dayWiseForecast.set(dayOfTheWeek, forecastForTheDay);
        } else {
            dayWiseForecast.set(dayOfTheWeek, [forecast]);
        }
    }

    for (let [key, value] of dayWiseForecast) {
        let temp_min = Math.min(...Array.from(value, (val) => val.temp_min));
        let temp_max = Math.min(...Array.from(value, (val) => val.temp_max));
        dayWiseForecast.set(key, {
            temp_min,
            temp_max,
            icon: value.find((v) => v.icon).icon,
        });
    }

    return dayWiseForecast;
};

const loadCurrentForecast = ({
    name,
    main: { temp, temp_max, temp_min },
    weather: {
        0: { main:background, description },
    },
}) => {
    const currentForecastElement = document.querySelector("#current-forecast");
    const backgroundchange = document.querySelector("body");
    backgroundchange.style.backgroundImage =`url('images/${background}.jpg')`;
    currentForecastElement.querySelector(".city").textContent = name;
    currentForecastElement.querySelector(".temp").textContent =
        formatTemperature(temp);
    currentForecastElement.querySelector(".description").textContent =
        description;
    backgroundchange.style.backgroundImage =`url('images/${background}.jpg')`;
    currentForecastElement.querySelector(
        ".min-max-temp"
    ).textContent = `H: ${formatTemperature(temp_max)} L: ${formatTemperature(temp_min)}`;
};

const loadhourlyforecast = (
    {
        main: { temp: tempNow },
        weather: {
            0: { icon: iconNow },
        },
    },
    hourlyforecast
) => {

    const timeFormatter = Intl.DateTimeFormat("en", {
        hour12: true,
        hour: "numeric",
    });
    let dataFor12Hours = hourlyforecast.slice(2, 14);
    const hourlyContainer = document.querySelector(".hourly-container");
    let innerHTMLstring = `<article>
    <h3 class="time">NOW</h3>
    <img class="icon" src="${createIconUrl(iconNow)}"/>
    <p class="hourly-temp">${formatTemperature(tempNow)}</p>
  </article>`;
    for (let { temp, icon, dt_txt } of dataFor12Hours) {
        innerHTMLstring += `<article>
        <h3 class="time">${timeFormatter.format(new Date(dt_txt))}</h3>
        <img class="icon" src="${createIconUrl(icon)}"/>
        <p class="hourly-temp">${formatTemperature(temp)}</p>
      </article>`;
    }
    hourlyContainer.innerHTML = innerHTMLstring;
};

const loadFiveDayForecast = (hourlyforecast) => {
    const dayWiseForecast = calculateDayWiseForecast(hourlyforecast);
    const container = document.querySelector(".five-day-forecast-container");
    let dayWiseInfo = "";

    Array.from(dayWiseForecast).map(
        ([day, { temp_max, temp_min, icon }], index) => {
            if (index < 5) {
                dayWiseInfo += `<article class="day-wise-forecast">
            <h3>${index === 0 ? "today" : day}</h3>
            <img class="icon" src="${createIconUrl(
                    icon
                )}" alt="icon for the forecast"/>
            <p class="min-temp">${formatTemperature(temp_min)}</p>
            <p class="max-temp">${formatTemperature(temp_max)}</p>
          </article>`;
            }
        }
    );
    container.innerHTML = dayWiseInfo;
};

const loadFeelsLike = ({ main: { feels_like } }) => {
    document.querySelector(".feels-like-temp").textContent =
        formatTemperature(feels_like);
};
const loadHumidity = ({ main: { humidity } }) => {
    document.querySelector(".humidity-text").textContent = `${humidity} %`;
};

const loadForecastUsingGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude: lat, longitude: lon } = coords;
        selectedCity = { lat, lon }
        loadData(selectedCity);
    }, error => console.log(error)
    )
}

const loadData = async (selectedCity) => {
    const currentWeather = await getCurrentWeatherData(selectedCity);
    loadCurrentForecast(currentWeather);
    const hourlyforecast = await gethourlyforecast(currentWeather);
    loadFiveDayForecast(hourlyforecast);
    loadhourlyforecast(currentWeather, hourlyforecast);
    loadFeelsLike(currentWeather);
    loadHumidity(currentWeather);
}


function debounce(func) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, 500);
    };
}

const onSearchChange = async (event) => {
    let { value } = event.target;
    if (!value) {
        selectedCity = null;
        selectedCityText = "";
    }
    if (value && selectedCityText !== value) {
        const listOfCities = await getCities(value);
        let options = "";
        for (let { lat, lon, name, state, country } of listOfCities) {
            options += `<option data-city-details='${JSON.stringify({ lat, lon, name })}' value="${name}, ${state}, ${country}"></options>`
        }
        document.querySelector("#cities").innerHTML = options;
    }

};
const debounceSearch = debounce((event) => onSearchChange(event));

const handleCitySelection = (event) => {
    selectedCityText = event.target.value;

    let options = document.querySelectorAll("#cities > option");

    if (options?.length) {
        let selectedOption = Array.from(options).find(opt => opt.value === selectedCityText);
        selectedCity = JSON.parse(selectedOption.getAttribute("data-city-details"));
    }
    loadData(selectedCity);
};



document.addEventListener("DOMContentLoaded", async () => {
    loadForecastUsingGeoLocation();
    const searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", debounceSearch);
    searchInput.addEventListener("change", handleCitySelection);
});
