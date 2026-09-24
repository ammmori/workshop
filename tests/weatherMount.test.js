import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SESSION_INFO } from '../src/utils/sessionData.js';
import { handleWeatherRequest } from '../src/api/weatherMount.js';

describe('Session Data & Weather API Handler', () => {
  test('SESSION_INFO structure and deliverables validation', () => {
    assert.equal(SESSION_INFO.attendee, 'Alexandre Mori');
    assert.equal(SESSION_INFO.ticketKey, 'AI-195');
    assert.ok(SESSION_INFO.deliverables.length >= 5);
    assert.equal(SESSION_INFO.stats.tasksCompleted, 5);
  });

  test('handleWeatherRequest executes with cached context', async () => {
    const mockContext = {
      jsonHeaders: { 'content-type': 'application/json' },
      async cached(key, ttl, fetcher) {
        return {
          city: 'Amsterdam',
          country: 'Netherlands',
          lat: 52.3676,
          lon: 4.9041,
          current: { temperature_2m: 18.5, relative_humidity_2m: 65, wind_speed_10m: 12 },
          current_units: { temperature_2m: '°C' },
          daily: {
            time: ['2026-09-24', '2026-09-25'],
            temperature_2m_max: [20, 21],
            temperature_2m_min: [12, 13],
            weather_code: [0, 2]
          }
        };
      }
    };

    const req = new Request('http://localhost/api/_a/57a28de8-afc5-40e3-b53e-ff1e34e97b74/weather?city=Amsterdam');
    const url = new URL(req.url);

    const response = await handleWeatherRequest(req, url, mockContext);
    assert.equal(response.headers.get('content-type'), 'application/json');

    const body = await response.json();
    assert.equal(body.city, 'Amsterdam');
    assert.equal(body.current.temperature_2m, 18.5);
    assert.equal(body.daily.time.length, 2);
  });
});
