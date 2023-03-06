export const M_URL = "https://api.meteomatics.com/"

// https://www.meteomatics.com/en/api/available-parameters/
// API parameter	Description
// wind_speed_10m:ms	Instantaneous wind speed at 10m above ground
// wind_dir_10m:d	Instantaneous wind direction at 10m above ground in degrees
// wind_gusts_10m_1h:ms	Wind gusts in 10 m in the previous 1h, in Beaufort(bft), kilometers/hour(km/h), knots(kn), meters/second(m/s)
// wind_gusts_10m_24h:ms	Wind gusts in 10 m in the previous 24h, in Beaufort(bft), kilometers/hour(km/h), knots(kn), meters/second(m/s)
// t_2m:C	Instantaneous temperature at 2m above ground in degrees Celsius (C), kelvin (K) or degree Fahrenheit (F)
// t_max_2m_24h:C	Maximum temperature at 2m height in the previous 24h, in degrees Celsius (C), kelvin (K) or degree Fahrenheit (F)
// t_min_2m_24h:C	Minimum temperature at 2m height in the previous 24h, in degrees Celsius (C), kelvin (K) or degree Fahrenheit (F)
// msl_pressure:hPa	Mean sea level pressure in hectopascal (hPa) or pascal (Pa)
// precip_1h:mm	Precipitation accumulated over the past hour in millimeter (equivalent to litres per square meter)
// precip_24h:mm	Precipitation accumulated over the past 24 hours in millimeter (equivalent to litres per square meter)
// weather_symbol_1h:idx	Weather symbol giving an overall impression of the weather state of the past hour. (see this sectionfor more information)
// weather_symbol_24h:idx	Weather symbol giving an overall impression of the weather state of the past 24 hours. (see this section for more information)
// uv:idx	UV index
// sunrise:sql	Sunrise
// sunset:sql	Sunset
export const QUERY_PARAM_MAP = {
  wind_speed: "wind_speed_10m:ms",
  wind_direction: "wind_dir_10m:d",
  wind_gusts_1h: "wind_gusts_10m_1h:ms",
  wind_gusts_24h: "wind_gusts_10m_24h:ms",
  temp: "t_2m:C",
  temp_max_24h: "t_max_2m_24h:C",
  temp_min_24h: "t_min_2m_24h:C",
  msl_pressure: "msl_pressure:hPa",
  precipitation_1h: "precip_1h:mm",
  precipitation_24h: "precip_24h:mm",
  weather_symbol_1h: "weather_symbol_1h:idx",
  weather_symbol_24h: "weather_symbol_24h:idx",
  uv: "uv:idx",
  sunrise: "sunrise:sql",
  sunset: "sunset:sql",
};

export const UNIT_SWITCH_MAP = {
  "m/s": x => x * 3.6,
  "°C": x => (x * 9) / 5 + 32,
}

// basic plan is limited to 10 per request
export const PARAMS_HOURLY = {
  wind_speed: {
    name: "Wind Speed",
    unit: "m/s",
    value: "wind_speed",
    queryParam: QUERY_PARAM_MAP.wind_speed,
  },
  wind_direction: {
    name: "Wind Direction",
    unit: "°",
    value: "wind_direction",
    queryParam: QUERY_PARAM_MAP.wind_direction,
  },
  wind_gusts_1h: {
    name: "Wind Gusts 1h",
    unit: "m/s",
    value: "wind_gusts_1h",
    queryParam: QUERY_PARAM_MAP.wind_gusts_1h,
  },
  temp: {
    name: "Temperature",
    unit: "°C",
    value: "temp",
    queryParam: QUERY_PARAM_MAP.temp,
  },
  msl_pressure: {
    name: "Air Pressure",
    unit: "hPa",
    value: "msl_pressure",
    queryParam: QUERY_PARAM_MAP.msl_pressure,
  },
  precipitation_1h: {
    name: "Precipitation 1h",
    unit: "mm",
    value: "precipitation_1h",
    queryParam: QUERY_PARAM_MAP.precipitation_1h,
  },
  uv: {
    name: "UV",
    unit: "",
    value: "uv",
    queryParam: QUERY_PARAM_MAP.uv,
  },
};

export const PARAMS_HOURLY_ARRAY = Object.values(PARAMS_HOURLY);

export const PARAMS_DAILY = {
  wind_speed: {
    name: "Wind Speed",
    unit: "m/s",
    value: "wind_speed",
    queryParam: QUERY_PARAM_MAP.wind_speed,
  },
  wind_direction: {
    name: "Wind Direction",
    unit: "°",
    value: "wind_direction",
    queryParam: QUERY_PARAM_MAP.wind_direction,
  },
  wind_gusts_24h: {
    name: "Wind Gusts 24h",
    unit: "m/s",
    value: "wind_gusts_24h",
    queryParam: QUERY_PARAM_MAP.wind_gusts_24h,
  },
  temp_max_24h: {
    name: "Temperature Max 24h",
    unit: "°C",
    value: "temp_max_24h",
    queryParam: QUERY_PARAM_MAP.temp_max_24h,
  },
  temp_min_24h: {
    name: "Temperature Min 24h",
    unit: "°C",
    value: "temp_min_24h",
    queryParam: QUERY_PARAM_MAP.temp_min_24h,
  },
  msl_pressure: {
    name: "Air Pressure",
    unit: "hPa",
    value: "msl_pressure",
    queryParam: QUERY_PARAM_MAP.msl_pressure,
  },
  precipitation_24h: {
    name: "Precipitation 24h",
    unit: "mm",
    value: "precipitation_24h",
    queryParam: QUERY_PARAM_MAP.precipitation_24h,
  },
  sunrise: {
    name: "Sunrise",
    unit: "",
    value: "sunrise",
    queryParam: QUERY_PARAM_MAP.sunrise,
  },
  sunset: {
    name: "Sunset",
    unit: "",
    value: "sunset",
    queryParam: QUERY_PARAM_MAP.sunset,
  },
};

export const PARAMS_DAILY_ARRAY = Object.values(PARAMS_DAILY);

export const M_API_KEY = import.meta.env.VITE_METEOMATICS_API_KEY
export const G_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY