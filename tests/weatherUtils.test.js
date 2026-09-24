import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  celsiusToFahrenheit, 
  formatTemperature, 
  getWeatherCondition, 
  formatDayOfWeek 
} from '../src/utils/weatherUtils.js';

describe('Weather Utility Functions', () => {
  test('celsiusToFahrenheit converts temperatures correctly', () => {
    assert.equal(celsiusToFahrenheit(0), 32);
    assert.equal(celsiusToFahrenheit(100), 212);
    assert.equal(celsiusToFahrenheit(20), 68);
    assert.equal(celsiusToFahrenheit(-10), 14);
  });

  test('formatTemperature handles C and F units correctly', () => {
    assert.equal(formatTemperature(20, 'C'), '20°C');
    assert.equal(formatTemperature(20, 'F'), '68°F');
    assert.equal(formatTemperature(null, 'C'), '--');
    assert.equal(formatTemperature(undefined, 'F'), '--');
  });

  test('getWeatherCondition maps WMO weather codes', () => {
    assert.deepEqual(getWeatherCondition(0), { label: 'Clear Sky', icon: '☀️' });
    assert.deepEqual(getWeatherCondition(2), { label: 'Partly Cloudy', icon: '⛅' });
    assert.deepEqual(getWeatherCondition(61), { label: 'Rain', icon: '🌧️' });
    assert.deepEqual(getWeatherCondition(95), { label: 'Thunderstorm', icon: '⛈️' });
    assert.equal(getWeatherCondition(999).label, 'Variable');
  });

  test('formatDayOfWeek converts date strings', () => {
    assert.equal(formatDayOfWeek('2026-09-24'), 'Thu');
    assert.equal(formatDayOfWeek('invalid-date'), 'invalid-date');
  });
});
