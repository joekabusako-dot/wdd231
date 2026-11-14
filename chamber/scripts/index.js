const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url =
    'https://api.openweathermap.org/data/2.5/weather?lat=-4.303&lon=15.298&units=imperial&appid=8ed6371cf483219051eb1f8325eabedd';

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc =
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    captionDesc.textContent = desc;
}

apiFetch();

const forecastURL =
    'https://api.openweathermap.org/data/2.5/forecast?lat=-4.303&lon=15.298&units=imperial&appid=8ed6371cf483219051eb1f8325eabedd';

async function getWeather() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(url),
            fetch(forecastURL)
        ]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data");
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData);

    } catch (error) {
        console.error(error);
    }
}


function displayWeather(data) {
    const description = document.querySelector("#weather-description");

    description.innerHTML = `
        <p><strong>Weather:</strong> 
        ${data.weather[0].description}</p>

        <p><strong>Current Temperature:</strong> 
        ${data.main.temp}°C</p>
    `;
}

function displayForecast(data) {
    const forecastElement = document.querySelector("#forecast");

    const dailyForecast = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyForecast[date]) {
            dailyForecast[date] = item;
        } else {
            const currentHour = Number(dailyForecast[date].dt_txt.slice(11, 13));
            const newHour = Number(item.dt_txt.slice(11, 13));

            if (Math.abs(newHour - 12) < Math.abs(currentHour - 12)) {
                dailyForecast[date] = item;
            }
        }
    });

    const nextThreeDays = Object.values(dailyForecast).slice(0, 3);

    forecastElement.innerHTML = nextThreeDays.map(day => `
        <div class="forecast-day">
            <h4>${day.dt_txt.split(" ")[0]}</h4>
            <p>Temperature: ${day.main.temp}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
        </div>
    `).join("");
}

getWeather();



const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Failed to fetch member data");
        }

        const members = await response.json();

        const qualifiedMembers = members.filter(
            member =>
                member.membershipLevel.toLowerCase() === "gold" ||
                member.membershipLevel.toLowerCase() === "silver"
        );

        const shuffled = [...qualifiedMembers].sort(() => Math.random() - 0.5);

        const spotlightCount = Math.floor(Math.random() * 2) + 2;

        const selectedMembers = shuffled.slice(0, spotlightCount);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.companyName}</h3>

            <img src="${member.image}" 
                alt="${member.companyName} logo"
                loading="lazy">

            <p><strong>Phone:</strong> ${member.phoneNumber}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p>
                <strong>Website:</strong>
                <a href="https://${member.url}" target="_blank">
                    ${member.url}
                </a>
            </p>

            <p>
                <strong>Membership:</strong>
                ${member.membershipLevel}
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();