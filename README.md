# Workshop App - Weather Widget & OpenCode Session Dashboard (`AI-195`)

Attendee: **Alexandre Mori** | Kramp OpenCode Session

## 🚀 Features & Deliverables

1. **Weather API Mount**:
   * Endpoint: `/api/_a/57a28de8-afc5-40e3-b53e-ff1e34e97b74/weather`
   * Open-Meteo REST API ingestion with 5-minute cache.
2. **Interactive Preact Artifact**:
   * City search & preset shortcuts.
   * °C / °F unit toggle.
   * 7-Day weather forecast.
   * OpenCode session deliverables tracking matrix.
3. **Automated Unit Tests**:
   * Node.js test runner covering temperature unit conversion formulas, WMO weather condition code mapper, and API mount caching.

## 🧪 Running Tests

```bash
npm test
```
