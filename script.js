const apiKey = '8048a09836cdc7a2ac12620693db01c2';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/hr';

    const condition = data.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) {
      weatherIcon.src = "images/clouds.png";
    } else if (condition.includes("clear")) {
      weatherIcon.src = "images/clear.png";
    } else if (condition.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (condition.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (condition.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else if (condition.includes("thunderstorm")) {
      weatherIcon.src = "images/storm.png";
    } else {
      weatherIcon.src = "images/mist.png";
    }

  } catch (error) {
    alert("⚠️ " + error.message);
  }
}

searchButton.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) checkWeather(city);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchButton.click();
});
