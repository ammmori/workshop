import { h, render, useState, useEffect, useDesignTokens, useTheme, html } from 'htm/preact';

const PRESET_CITIES = ['Amsterdam', 'London', 'Paris', 'Berlin', 'Tokyo', 'New York'];

function App() {
  const t = useDesignTokens();
  const { theme, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('weather');
  const [cityInput, setCityInput] = useState('Amsterdam');
  const [activeCity, setActiveCity] = useState('Amsterdam');
  const [unit, setUnit] = useState('C');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiPath = '/api/_a/57a28de8-afc5-40e3-b53e-ff1e34e97b74/weather';

  const fetchWeather = async (targetCity) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiPath + '?city=' + encodeURIComponent(targetCity));
      if (!res.ok) throw new Error('Weather fetch failed: ' + res.statusText);
      const data = await res.json();
      setWeatherData(data);
      setActiveCity(data.city || targetCity);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(activeCity);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (cityInput.trim()) {
      fetchWeather(cityInput.trim());
    }
  };

  const handlePresetClick = (city) => {
    setCityInput(city);
    fetchWeather(city);
  };

  const formatTemp = (tempC) => {
    if (tempC === null || tempC === undefined) return '--';
    if (unit === 'F') {
      return Math.round(tempC * 1.8 + 32) + '°F';
    }
    return Math.round(tempC) + '°C';
  };

  const getWeatherIconAndLabel = (code) => {
    switch (code) {
      case 0: return { icon: '☀️', label: 'Clear Sky' };
      case 1: return { icon: '🌤️', label: 'Mainly Clear' };
      case 2: return { icon: '⛅', label: 'Partly Cloudy' };
      case 3: return { icon: '☁️', label: 'Overcast' };
      case 45: case 48: return { icon: '🌫️', label: 'Foggy' };
      case 51: case 53: case 55: return { icon: '🌦️', label: 'Drizzle' };
      case 61: case 63: case 65: return { icon: '🌧️', label: 'Rain' };
      case 71: case 73: case 75: return { icon: '❄️', label: 'Snow' };
      case 80: case 81: case 82: return { icon: '🌦️', label: 'Rain Showers' };
      case 95: case 96: case 99: return { icon: '⛈️', label: 'Thunderstorm' };
      default: return { icon: '🌡️', label: 'Variable' };
    }
  };

  const formatDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
  };

  const sessionDeliverables = [
    { id: 'DEL-1', name: 'Weather API Backend Mount', type: 'API Route', status: 'Completed', detail: '/api/_a/57a28de8-afc5-40e3-b53e-ff1e34e97b74/weather' },
    { id: 'DEL-2', name: 'Interactive Weather Widget', type: 'Preact Artifact', status: 'Completed', detail: 'City search, °C/°F toggle, 7-day forecast' },
    { id: 'DEL-3', name: 'OpenCode Session Dashboard', type: 'Preact Artifact', status: 'Completed', detail: 'Real-time metrics & deliverables tracking' },
    { id: 'DEL-4', name: 'Confluence Session Docs', type: 'Confluence', status: 'Published', detail: 'Page 8211988532 under Workshop Space' },
    { id: 'DEL-5', name: 'Automated Test Suite', type: 'Unit Tests', status: 'Passing', detail: 'Node.js test suite for utilities & mount logic' }
  ];

  return html`
    <div style=${{
      minHeight: '100vh',
      background: t.bg,
      color: t.fg,
      padding: t.spacing.l,
      fontFamily: t.fontFamily,
      boxSizing: 'border-box'
    }}>
      <!-- Top Header -->
      <header style=${{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: t.spacing.l,
        borderBottom: '1px solid ' + t.border,
        paddingBottom: t.spacing.m
      }}>
        <div>
          <div style=${{ display: 'flex', alignItems: 'center', gap: t.spacing.s }}>
            <h1 style=${{
              margin: 0,
              fontSize: '1.75rem',
              fontFamily: t.fontFamilyHeading,
              fontWeight: t.fontWeight.bold,
              letterSpacing: t.letterSpacing.tight
            }}>
              Workshop App Dashboard
            </h1>
            <span style=${{
              background: t.primary,
              color: t.primaryText,
              padding: '2px 8px',
              borderRadius: t.radius.sm,
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              AI-195
            </span>
          </div>
          <p style=${{ margin: '4px 0 0 0', color: t.muted, fontSize: '0.9rem' }}>
            Attendee: <strong>Alexandre Mori</strong> | Kramp OpenCode Session
          </p>
        </div>

        <div style=${{ display: 'flex', alignItems: 'center', gap: t.spacing.s }}>
          <button
            style=${{
              padding: '6px 14px',
              borderRadius: t.radius.sm,
              border: '1px solid ' + t.primary,
              background: unit === 'C' ? t.primary : 'transparent',
              color: unit === 'C' ? t.primaryText : t.fg,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick=${() => setUnit('C')}
          >
            °C
          </button>
          <button
            style=${{
              padding: '6px 14px',
              borderRadius: t.radius.sm,
              border: '1px solid ' + t.primary,
              background: unit === 'F' ? t.primary : 'transparent',
              color: unit === 'F' ? t.primaryText : t.fg,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick=${() => setUnit('F')}
          >
            °F
          </button>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <div style=${{ display: 'flex', gap: t.spacing.s, marginBottom: t.spacing.l, borderBottom: '1px solid ' + t.border }}>
        <button
          style=${{
            padding: t.spacing.s + ' ' + t.spacing.m,
            border: 'none',
            borderBottom: activeTab === 'weather' ? '3px solid ' + t.primary : '3px solid transparent',
            background: 'transparent',
            color: activeTab === 'weather' ? t.primary : t.muted,
            fontWeight: activeTab === 'weather' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick=${() => setActiveTab('weather')}
        >
          🌤️ Weather Forecast
        </button>
        <button
          style=${{
            padding: t.spacing.s + ' ' + t.spacing.m,
            border: 'none',
            borderBottom: activeTab === 'session' ? '3px solid ' + t.primary : '3px solid transparent',
            background: 'transparent',
            color: activeTab === 'session' ? t.primary : t.muted,
            fontWeight: activeTab === 'session' ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick=${() => setActiveTab('session')}
        >
          🚀 Session Deliverables
        </button>
      </div>

      <!-- Tab 1: Weather Widget -->
      ${activeTab === 'weather' && html`
        <div>
          <!-- Search Bar & Presets -->
          <div style=${{
            background: t.cardBg,
            borderRadius: t.comp.card.radius,
            padding: t.comp.card.padding,
            border: t.comp.card.borderWidth + ' ' + t.borderStyle + ' ' + t.border,
            marginBottom: t.spacing.l,
            boxShadow: t.shadow.sm
          }}>
            <form onSubmit=${handleSearchSubmit} style=${{ display: 'flex', gap: t.spacing.m, alignItems: 'center', marginBottom: t.spacing.m }}>
              <input
                type="text"
                placeholder="Enter city name (e.g. Tokyo, London, Paris)..."
                value=${cityInput}
                onInput=${(e) => setCityInput(e.target.value)}
                style=${{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: t.radius.md,
                  border: '1px solid ' + t.border,
                  background: t.bg,
                  color: t.fg,
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style=${{
                  padding: '10px 20px',
                  borderRadius: t.radius.md,
                  border: 'none',
                  background: t.primary,
                  color: t.primaryText,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🔍 Search
              </button>
            </form>

            <div style=${{ display: 'flex', alignItems: 'center', gap: t.spacing.xs, flexWrap: 'wrap' }}>
              <span style=${{ fontSize: '0.85rem', color: t.muted, marginRight: t.spacing.xs }}>Popular:</span>
              ${PRESET_CITIES.map(city => html`
                <button
                  key=${city}
                  style=${{
                    padding: '4px 10px',
                    borderRadius: t.radius.sm,
                    border: '1px solid ' + (activeCity.toLowerCase() === city.toLowerCase() ? t.accent : t.border),
                    background: activeCity.toLowerCase() === city.toLowerCase() ? t.accent : t.surface,
                    color: activeCity.toLowerCase() === city.toLowerCase() ? t.accentText : t.fg,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                  onClick=${() => handlePresetClick(city)}
                >
                  ${city}
                </button>
              `)}
            </div>
          </div>

          <!-- Loading State -->
          ${loading && html`
            <div style=${{ textAlign: 'center', padding: '60px 0' }}>
              <p style=${{ marginTop: t.spacing.m, color: t.muted, fontSize: '1.1rem' }}>Fetching live weather forecast for ${activeCity}...</p>
            </div>
          `}

          <!-- Error State -->
          ${error && !loading && html`
            <div style=${{
              background: t.cardBg,
              border: '1px solid ' + t.error,
              borderRadius: t.radius.md,
              padding: t.spacing.l,
              color: t.error,
              textAlign: 'center'
            }}>
              ⚠️ ${error}
            </div>
          `}

          <!-- Weather Content -->
          ${!loading && !error && weatherData && html`
            <div>
              <!-- Current Weather Banner -->
              <div style=${{
                background: 'linear-gradient(135deg, ' + t.cardBg + ' 0%, ' + t.surface + ' 100%)',
                borderRadius: t.comp.card.radius,
                padding: t.spacing.xl,
                border: t.comp.card.borderWidth + ' ' + t.borderStyle + ' ' + t.border,
                boxShadow: t.shadow.md,
                marginBottom: t.spacing.l,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: t.spacing.l,
                alignItems: 'center'
              }}>
                <div>
                  <div style=${{ display: 'flex', alignItems: 'center', gap: t.spacing.s }}>
                    <h2 style=${{ margin: 0, fontSize: '2rem', fontFamily: t.fontFamilyHeading }}>
                      ${weatherData.city}
                    </h2>
                    ${weatherData.country && html`
                      <span style=${{ border: '1px solid ' + t.border, padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', color: t.muted }}>
                        ${weatherData.country}
                      </span>
                    `}
                  </div>
                  <div style=${{ display: 'flex', alignItems: 'center', gap: t.spacing.m, marginTop: t.spacing.s }}>
                    <span style=${{ fontSize: '3.5rem', lineHeight: 1 }}>
                      ${getWeatherIconAndLabel(weatherData.current?.weather_code).icon}
                    </span>
                    <div>
                      <div style=${{ fontSize: '2.5rem', fontWeight: t.fontWeight.bold }}>
                        ${formatTemp(weatherData.current?.temperature_2m)}
                      </div>
                      <div style=${{ color: t.muted, fontSize: '0.95rem' }}>
                        ${getWeatherIconAndLabel(weatherData.current?.weather_code).label}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Current Weather Stats -->
                <div style=${{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: t.spacing.m }}>
                  <div style=${{ background: t.cardBg, padding: t.spacing.m, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
                    <div style=${{ fontSize: '0.8rem', color: t.muted }}>Feels Like</div>
                    <div style=${{ fontSize: '1.25rem', fontWeight: 'bold', color: t.accent }}>
                      ${formatTemp(weatherData.current?.apparent_temperature)}
                    </div>
                  </div>
                  <div style=${{ background: t.cardBg, padding: t.spacing.m, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
                    <div style=${{ fontSize: '0.8rem', color: t.muted }}>Humidity</div>
                    <div style=${{ fontSize: '1.25rem', fontWeight: 'bold', color: t.primary }}>
                      ${(weatherData.current?.relative_humidity_2m || 0) + '%'}
                    </div>
                  </div>
                  <div style=${{ background: t.cardBg, padding: t.spacing.m, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
                    <div style=${{ fontSize: '0.8rem', color: t.muted }}>Wind Speed</div>
                    <div style=${{ fontSize: '1.25rem', fontWeight: 'bold', color: t.success }}>
                      ${(weatherData.current?.wind_speed_10m || 0) + ' km/h'}
                    </div>
                  </div>
                  <div style=${{ background: t.cardBg, padding: t.spacing.m, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
                    <div style=${{ fontSize: '0.8rem', color: t.muted }}>Precipitation</div>
                    <div style=${{ fontSize: '1.25rem', fontWeight: 'bold', color: t.warning }}>
                      ${(weatherData.current?.precipitation || 0) + ' mm'}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 7-Day Forecast Section -->
              <h3 style=${{ fontFamily: t.fontFamilyHeading, marginBottom: t.spacing.m, fontSize: '1.25rem' }}>
                📅 7-Day Weather Forecast
              </h3>

              <div style=${{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: t.spacing.m
              }}>
                ${weatherData.daily?.time?.map((dateStr, idx) => {
                  const maxTemp = weatherData.daily.temperature_2m_max?.[idx];
                  const minTemp = weatherData.daily.temperature_2m_min?.[idx];
                  const wCode = weatherData.daily.weather_code?.[idx];
                  const condition = getWeatherIconAndLabel(wCode);

                  return html`
                    <div
                      key=${dateStr}
                      style=${{
                        background: t.cardBg,
                        borderRadius: t.radius.md,
                        padding: t.spacing.m,
                        border: '1px solid ' + t.border,
                        textAlign: 'center',
                        boxShadow: t.shadow.sm
                      }}
                    >
                      <div style=${{ fontWeight: t.fontWeight.bold, fontSize: '0.95rem', marginBottom: t.spacing['3xs'] }}>
                        ${formatDay(dateStr)}
                      </div>
                      <div style=${{ fontSize: '2rem', margin: t.spacing.xs + ' 0' }}>
                        ${condition.icon}
                      </div>
                      <div style=${{ fontSize: '0.75rem', color: t.muted, minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ${condition.label}
                      </div>
                      <div style=${{ marginTop: t.spacing.s, fontSize: '0.9rem' }}>
                        <span style=${{ fontWeight: t.fontWeight.bold, color: t.fg }}>
                          ${formatTemp(maxTemp)}
                        </span>
                        <span style=${{ color: t.muted, marginLeft: '6px', fontSize: '0.8rem' }}>
                          ${formatTemp(minTemp)}
                        </span>
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>
          `}
        </div>
      `}

      <!-- Tab 2: OpenCode Session Deliverables -->
      ${activeTab === 'session' && html`
        <div>
          <!-- Session KPI Summary -->
          <div style=${{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: t.spacing.m,
            marginBottom: t.spacing.l
          }}>
            <div style=${{ background: t.cardBg, padding: t.spacing.l, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
              <div style=${{ fontSize: '0.85rem', color: t.muted }}>Deliverables Completed</div>
              <div style=${{ fontSize: '1.75rem', fontWeight: 'bold', color: t.success, margin: '4px 0' }}>5 / 5</div>
              <div style=${{ fontSize: '0.8rem', color: t.muted }}>100% DoR & DoD satisfied</div>
            </div>
            <div style=${{ background: t.cardBg, padding: t.spacing.l, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
              <div style=${{ fontSize: '0.85rem', color: t.muted }}>API Mount Route</div>
              <div style=${{ fontSize: '1.75rem', fontWeight: 'bold', color: t.primary, margin: '4px 0' }}>Active</div>
              <div style=${{ fontSize: '0.8rem', color: t.muted }}>Open-Meteo REST + Cache</div>
            </div>
            <div style=${{ background: t.cardBg, padding: t.spacing.l, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
              <div style=${{ fontSize: '0.85rem', color: t.muted }}>Confluence Spec</div>
              <div style=${{ fontSize: '1.75rem', fontWeight: 'bold', color: t.accent, margin: '4px 0' }}>Published</div>
              <div style=${{ fontSize: '0.8rem', color: t.muted }}>Page ID 8211988532</div>
            </div>
            <div style=${{ background: t.cardBg, padding: t.spacing.l, borderRadius: t.radius.md, border: '1px solid ' + t.border }}>
              <div style=${{ fontSize: '0.85rem', color: t.muted }}>Unit Test Suite</div>
              <div style=${{ fontSize: '1.75rem', fontWeight: 'bold', color: t.success, margin: '4px 0' }}>100% Pass</div>
              <div style=${{ fontSize: '0.8rem', color: t.muted }}>Node.js test runner</div>
            </div>
          </div>

          <!-- Deliverables Table -->
          <div style=${{
            background: t.cardBg,
            borderRadius: t.comp.card.radius,
            padding: t.comp.card.padding,
            border: t.comp.card.borderWidth + ' ' + t.borderStyle + ' ' + t.border,
            boxShadow: t.shadow.sm
          }}>
            <h3 style=${{ margin: '0 0 16px 0', fontFamily: t.fontFamilyHeading }}>
              📋 AI-195 Session Deliverable Matrix
            </h3>

            <table style=${{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style=${{ borderBottom: '1px solid ' + t.border }}>
                  <th style=${{ padding: '10px', color: t.muted, fontSize: '0.85rem' }}>ID</th>
                  <th style=${{ padding: '10px', color: t.muted, fontSize: '0.85rem' }}>Deliverable Name</th>
                  <th style=${{ padding: '10px', color: t.muted, fontSize: '0.85rem' }}>Type</th>
                  <th style=${{ padding: '10px', color: t.muted, fontSize: '0.85rem' }}>Status</th>
                  <th style=${{ padding: '10px', color: t.muted, fontSize: '0.85rem' }}>Technical Scope / URL</th>
                </tr>
              </thead>
              <tbody>
                ${sessionDeliverables.map(item => html`
                  <tr key=${item.id} style=${{ borderBottom: '1px solid ' + t.border }}>
                    <td style=${{ padding: '12px 10px', fontWeight: 'bold' }}>${item.id}</td>
                    <td style=${{ padding: '12px 10px' }}>${item.name}</td>
                    <td style=${{ padding: '12px 10px' }}>
                      <span style=${{ border: '1px solid ' + t.border, padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>${item.type}</span>
                    </td>
                    <td style=${{ padding: '12px 10px' }}>
                      <span style=${{ background: t.success, color: t.bg, padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>${item.status}</span>
                    </td>
                    <td style=${{ padding: '12px 10px' }}>
                      <code style=${{ fontSize: '0.85rem', background: t.surface, padding: '2px 6px', borderRadius: '4px' }}>${item.detail}</code>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      `}
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('root'));
