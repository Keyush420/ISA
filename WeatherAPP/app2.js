const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityName = document.querySelector('.city-name');
const dateTime = document.querySelector('.date-time');

search.addEventListener('click', () => {
  const city = document.querySelector('.search-box input').value;
  if (city === '') return;
  getWeatherData(city);
});
function getWeatherData(city) {
  const APIKey = 'd1022f49630876ebb25992b6f3e9c6a9';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then(response => response.json())
  .then(json => {
  if (json.cod === '404') {
  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
  return;
  }
  error404.style.display = 'none';
  const image = document.querySelector('.weather-box img');
  const temperature = document.querySelector('.weather-box .temperature');
  const description = document.querySelector('.weather-box .description');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');
  switch (json.weather[0].main) {
  case 'Clear':
  image.src = 'image/clear.png';
  break;
  case 'Rain':
  image.src = 'image/rain.png';
  break;
  case 'Snow':
  image.src = 'image/snow.png';
  break;
  case 'Clouds':
  image.src = 'image/cloud.png';
  break;
  case 'Haze':
  image.src = 'image/mist.png';
  break;
  default:
  image.src = '';
  }
  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  cityName.innerHTML = `${json.name}`;
  dateTime.innerHTML = new Date().toLocaleString();
  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  container.style.height = '590px';
  });
}
// Call the function with 'Florence' on page load
getWeatherData('Florence');
