/**
 * Preload script for Time & Weather plugin
 * This script runs with Node.js access and can bridge to the frontend
 */

const https = require('https');

/**
 * Fetch weather data from wttr.in (free, no API key required)
 * @param {string} location - City name or coordinates (optional, auto-detects if empty)
 * @returns {Promise<object>} Weather data
 */
function fetchWeather(location = '') {
  return new Promise((resolve, reject) => {
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const weatherData = JSON.parse(data);
          resolve(weatherData);
        } catch (e) {
          reject(new Error('Failed to parse weather data'));
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

/**
 * Get formatted weather information
 * @param {string} location - City name (optional)
 * @returns {Promise<object>} Formatted weather info
 */
async function getWeatherInfo(location = '') {
  try {
    const data = await fetchWeather(location);
    const current = data.current_condition[0];
    const area = data.nearest_area[0];

    return {
      success: true,
      location: area.areaName[0].value + ', ' + area.country[0].value,
      temperature: current.temp_C,
      feelsLike: current.FeelsLikeC,
      humidity: current.humidity,
      description: current.weatherDesc[0].value,
      windSpeed: current.windspeedKmph,
      windDirection: current.winddir16Point,
      visibility: current.visibility,
      uvIndex: current.uvIndex,
      precipitation: current.precipMM
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch weather data'
    };
  }
}

// Expose functions to the renderer process
window.exports = {
  'time-weather': {
    mode: 'none',
    args: {
      enter: (action) => {
        // This is called when the plugin is entered
        // The main logic will be in index.html
      }
    }
  }
};

// Expose weather function globally for the frontend to use
window.getWeatherInfo = getWeatherInfo;
