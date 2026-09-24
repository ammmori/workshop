/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius
 * @returns {number}
 */
export function celsiusToFahrenheit(celsius) {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return 0;
  return Math.round((celsius * 1.8 + 32) * 10) / 10;
}

/**
 * Format Celsius or Fahrenheit value with unit string
 * @param {number} tempCelsius
 * @param {'C' | 'F'} unit
 * @returns {string}
 */
export function formatTemperature(tempCelsius, unit = 'C') {
  if (tempCelsius === null || tempCelsius === undefined || isNaN(tempCelsius)) return '--';
  if (unit === 'F') {
    return `${Math.round(celsiusToFahrenheit(tempCelsius))}°F`;
  }
  return `${Math.round(tempCelsius)}°C`;
}

/**
 * Map WMO Weather Interpretation Codes to human readable label & icon symbol
 * @param {number} code
 * @returns {{ label: string, icon: string }}
 */
export function getWeatherCondition(code) {
  switch (code) {
    case 0:
      return { label: 'Clear Sky', icon: '☀️' };
    case 1:
      return { label: 'Mainly Clear', icon: '🌤️' };
    case 2:
      return { label: 'Partly Cloudy', icon: '⛅' };
    case 3:
      return { label: 'Overcast', icon: '☁️' };
    case 45:
    case 48:
      return { label: 'Foggy', icon: '🌫️' };
    case 51:
    case 53:
    case 55:
      return { label: 'Drizzle', icon: '🌦️' };
    case 61:
    case 63:
    case 65:
      return { label: 'Rain', icon: '🌧️' };
    case 66:
    case 67:
      return { label: 'Freezing Rain', icon: '❄️🌧️' };
    case 71:
    case 73:
    case 75:
      return { label: 'Snow Fall', icon: '❄️' };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain Showers', icon: '🌦️' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: '⛈️' };
    default:
      return { label: 'Variable', icon: '🌡️' };
  }
}

/**
 * Format date string (YYYY-MM-DD) into Day of Week (e.g. Mon, Tue)
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDayOfWeek(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}
