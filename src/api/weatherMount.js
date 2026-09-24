/**
 * Weather API Mount Handler
 * Handles weather forecast requests with geocoding and 5-min caching
 * 
 * @param {Request} req
 * @param {URL} url
 * @param {Object} ctx
 * @returns {Promise<Response>}
 */
export async function handleWeatherRequest(req, url, ctx) {
  const cityParam = url.searchParams.get("city") || "Amsterdam";
  const cacheKey = `weather_${cityParam.toLowerCase().trim()}`;

  const data = await ctx.cached(cacheKey, 300000, async () => {
    let lat = 52.3676;
    let lon = 4.9041;
    let cityName = cityParam;
    let country = "Netherlands";

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityParam)}&count=1&language=en&format=json`;
      const geoResp = await fetch(geoUrl);
      if (geoResp.ok) {
        const geoData = await geoResp.json();
        if (geoData.results && geoData.results.length > 0) {
          const match = geoData.results[0];
          lat = match.latitude;
          lon = match.longitude;
          cityName = match.name;
          country = match.country || "";
        }
      }
    } catch (e) {
      console.error("Geocoding failed:", e);
    }

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    const forecastResp = await fetch(forecastUrl);
    if (!forecastResp.ok) {
      throw new Error(`Open-Meteo error: ${forecastResp.statusText}`);
    }
    const weather = await forecastResp.json();

    return {
      city: cityName,
      country: country,
      lat: lat,
      lon: lon,
      current: weather.current,
      current_units: weather.current_units,
      daily: weather.daily,
      daily_units: weather.daily_units
    };
  });

  return new Response(JSON.stringify(data), { headers: ctx.jsonHeaders });
}
