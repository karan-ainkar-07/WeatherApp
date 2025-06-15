import getNextFiveDates from "./getNextDates";
function getData(data) {
    const { location, current, forecast } = data;
    let NewArray = forecast.forecastday[0]?.hour
      .filter(hour => new Date(hour.time) > new Date(location.localtime));

    if (NewArray.length < 14) {
      const remaining = 14 - NewArray.length;
      const nextHours = forecast.forecastday[1]?.hour?.slice(0, remaining) || [];
      NewArray = [...NewArray, ...nextHours];
    }

  const dates=getNextFiveDates(location.localtime);

  return {
    City: location.name,
    Country: location.country,
    Temperature: current.temp_c,
    Condition: current.condition.text,
    Time: location.localtime,
    Precipitation: current.precip_mm,
    AirQuality: current.air_quality,
    Humidity: current.humidity,
    Wind: {
      windSpeed: current.wind_kph,
      windDirection: current.wind_dir,
    },
    FeelsLike: current.feelslike_c,
    UVIndex: current.uv,
    Visibility: current.vis_km,
    

    dailyForecast: forecast.forecastday.map((day,index)=>(
        { 
            date:dates[index],
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            precipitation: day.day.totalprecip_mm,
            windSpeed: day.day.maxwind_kph,
            humidity: day.day.avghumidity,
            AirQuality: day.day.air_quality['us-epa-index'],
        }
    )),

    hourlyForecast: NewArray
      .map(hour => ({
        time: hour.time,
        temperature: hour.temp_c,
        condition: hour.condition.text,
        precipitation: hour.precip_mm,
        windSpeed: hour.wind_kph,
        humidity: hour.humidity,
      })),
  };
}

export default getData;
