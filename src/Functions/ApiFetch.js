async function getWeatherAPIData(city) {
  try {
    let apiKey = import.meta.env.VITE_WEATHER_API_ID;
     const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=yes`;
     const response = await fetch(url);
     const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Error fetching WeatherAPI data:", error);
    return null;
  }
}
export default getWeatherAPIData;