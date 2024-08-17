export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const geoOptions = {
  method: "GET",
  params: { countryIds: "TR" },
  headers: {
    "X-RapidAPI-Key": "aa9b6e43c8msh5d99d2388fbdea0p19bcb7jsnbde9c79798eb",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/`;
export const WEATHER_API_KEY = "4903de114e51eca07bdf4980ea671ebd";
