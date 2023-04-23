// Selecting necessary elements from the HTML document
const body = document.querySelector('body');
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityName = document.querySelector('.city-name');
const dateTime = document.querySelector('.date-time');
const pressure = document.querySelector('.pressure span');
// Adding click event listener to search button
search.addEventListener('click', () => {
  const city = document.querySelector('.search-box input').value;
   // Getting input value from user
  if (city === '') return;
  // Calling function to fetch and display weather data
 
  getWeatherData(city);
});
// Function to fetch weather data from API
function getWeatherData(city) {
  // Setting API key
  const APIKey = 'd1022f49630876ebb25992b6f3e9c6a9';
  // Fetching weather data from API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then(response => response.json())
  .then(json => {
    if (json.cod === '404') {
      container.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';// Checking if city is not found
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }
    error404.style.display = 'none';// Removing error message if city is found

    // Selecting necessary elements to display weather data
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    // Switch statement to set background image and weather icon based on weather condition
    switch (json.weather[0].main) {
      case 'Clear':
        body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?sunny")';
        image.src = 'image/clear.png';
        break;
      case 'Rain':
        body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?rain")';
        image.src = 'image/rain.png';
        break;
      case 'Snow':
        body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?snow")';
        image.src = 'image/snow.png';
        break;
      case 'Clouds':
        body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?cloudy")';
        image.src = 'image/cloud.png';
        break;
      case 'Haze':
        body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?mist")';
        image.src = 'image/mist.png';
        break;
      default:
        container.style.backgroundImage = 'none';
        image.src = '';
    }
    
// Setting weather data to the HTML elements
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    cityName.innerHTML = `${json.name}`;
    dateTime.innerHTML = new Date().toLocaleString();
    pressure.innerHTML = `${json.main.pressure}hPa`;
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    container.style.height = '590px';
  });
}

// Call the function with 'Florence' on page load
getWeatherData('Florence');
