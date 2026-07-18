Use this capability to fetch weather data from Open-Meteo.

Routing rule:
- For any user request about weather, forecast, temperature, or air quality for a place, call `weather-tool.weather` first.
- Do not use `builtin.http` for weather lookups unless this capability is unavailable or returns an error.

Supported actions:
- get_current: current conditions for a city
- get_forecast: 5-day forecast for a city
- get_air_quality: AQI/PM values by coordinates

Input must follow the weather input schema exactly.
Prefer metric units unless user explicitly requests imperial.
