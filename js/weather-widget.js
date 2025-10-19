// Map keywords to emojis
const emojiMap = {
  sunny: "☀️",
  clear: "🌕",
  cloudy: "☁️",
  overcast: "🌥️",
  rain: "🌧️",
  showers: "🌦️",
  thunder: "⛈️",
  snow: "❄️",
  fog: "🌫️",
  wind: "💨"
};

function getEmoji(forecast) {
  const lower = forecast.toLowerCase();
  for (const keyword in emojiMap) {
    if (lower.includes(keyword)) return emojiMap[keyword];
  }
  return "🌡️"; // fallback
}

fetch('https://api.weather.gov/gridpoints/PSR/153,63/forecast')
  .then(response => response.json())
  .then(data => {
    const periods = data.properties.periods.slice(0, 3);
    const container = document.getElementById('forecast-grid');

    periods.forEach(period => {
      const emoji = getEmoji(period.shortForecast);
      const card = document.createElement('div');
      card.className = 'forecast-tile';

      card.innerHTML = `
        <div class="emoji">${emoji}</div>
        <img src="${period.icon}" alt="${period.shortForecast}">
        <div class="forecast-text">
          <h3>${period.name}</h3>
          <p>${period.temperature}°F</p>
          <p>${period.shortForecast}</p>
          <p class="wind">💨 ${period.windSpeed} ${period.windDirection}</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
