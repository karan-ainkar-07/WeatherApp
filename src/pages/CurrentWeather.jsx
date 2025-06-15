import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "weather-icons/css/weather-icons.css";
import {
  HumidityDescription,
  AirQualityDescription,
  VisibilityDescription,
  FeelsLikeDescription,
  getUVDescription
} from "../Functions/Description";

import getWeatherAPIData from "../Functions/ApiFetch";
import getData from "../Functions/Dispatch";
import { addSearchItem } from "../Slices/searchList";
import videos, { icons, color } from "../Functions/Videos";
import simplifyCondition from "../Functions/SimplifyCondition";

function CurrentWeather() {
  const SearchData = useSelector((state) => state.searches.searchList);
  const dispatch = useDispatch();
  const params = useParams();
  const [City, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [simplifiedCondition, setSimplifiedCondition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.location) {
      const lowerCity = params.location.toLowerCase();
      setCity(lowerCity);
      setWeather(SearchData[lowerCity]);
    }
  }, [params, SearchData]);

  useEffect(() => {
    if (City && !weather) {
      getWeatherAPIData(City).then((data) => {
        if (!data.error) {
          const searchItem = getData(data);
          dispatch(addSearchItem(searchItem));
          setSimplifiedCondition(simplifyCondition(data.current.condition.text, weather?.Time));
        } else {
          alert("City not found. Please try again.");
          navigate('/');
        }
      });
    }
  }, [City, dispatch, weather]);

  useEffect(() => {
    if (weather?.Condition) {
      setSimplifiedCondition(simplifyCondition(weather.Condition, weather?.Time));
    }
  }, [weather]);

  if (!City || !simplifiedCondition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="absolute min-h-screen w-full z-[-2] bg-[#214d78] text-shadow-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
      >
        <source src={videos[simplifiedCondition]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="min-h-screen w-full text-black dark:text-white px-4 py-6 sm:px-10 lg:px-24 xl:px-32 space-y-8">
        
        {/* 🔄 Refresh Button (Top Right of Weather Block) */}
        <div className="flex justify-end max-w-2xl mx-auto lg:absolute lg:right-10 lg:top-10 ">
          <button
            onClick={() => {
              if (City) {
                getWeatherAPIData(City).then((data) => {
                  if (!data.error) {
                    const searchItem = getData(data);
                    dispatch(addSearchItem(searchItem));
                    setSimplifiedCondition(simplifyCondition(data.current.condition.text, data.location.localtime));
                    setWeather(searchItem); 
                  } else {
                    alert("Failed to refresh. Try again.");
                  }
                });
              }
            }}
            className="px-4 py-2 mb-2 bg-gray-800 opacity-80 hover:opacity-100 hover:bg-gray-1000 text-white rounded-xl font-semibold backdrop-brightness-110 backdrop-blur-xl shadow-lg transition-all duration-300"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Main Weather Block */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 opacity-80 space-y-4 backdrop-blur-xl text-white">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase text-gray-700 dark:text-gray-300">
            {weather?.Country}
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">{params.location}</h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-black dark:text-white">
            {weather?.Temperature}°
          </h1>
          <h3 className="text-gray-200 dark:text-gray-300 text-base sm:text-lg md:text-xl font-semibold tracking-wide">{weather?.Condition}</h3>
          <div className="flex justify-center w-full mt-2 gap-6 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>High: <strong>{weather?.dailyForecast?.[0]?.maxTemp}°</strong></span>
            <span>Low: <strong>{weather?.dailyForecast?.[0]?.minTemp}°</strong></span>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="card p-4 rounded-2xl w-full overflow-x-auto bg-gray-800 backdrop-blur-xl opacity-80">
          <div className="flex space-x-4 pb-2 justify-center">
            {weather?.hourlyForecast?.slice(0, 10).map((hour, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center relative min-w-[70px]"
              >
                {idx > 0 && (
                  <div className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 h-8 md:h-15 w-px md:5px bg-gray-400 opacity-80"></div>
                )}
                <div className="flex flex-col items-center justify-center text-white p-3 rounded-lg transition-all duration-200 hover:bg-white/10">
                  <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium mb-1">
                    {hour.time?.split(" ")[1]}
                  </h4>
                  <i
                    className={`${icons[simplifyCondition(hour.condition, hour.time)]} text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1`}
                  ></i>
                  <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">
                    {hour.temperature}°
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Forecast */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl backdrop-blur-xl bg-gray-800 opacity-80 shadow-md w-full sm:w-auto gap-3 text-white overflow-x-auto">
          <h2 className="text-2xl self-start sm:text-3xl mx-2 sm:px-4 font-semibold mb-4"> Daily Forecast</h2>
          {weather?.dailyForecast?.map((day, index) => (
            <div className="w-full" key={day.date}>
              <div className={`flex justify-between items-center gap-6 text-center min-w-max px-2 py-3 sm:px-4 sm:py-4 rounded-xl transition-all duration-200 hover:bg-white/10 ${index !== 0 ? 'border-t border-white/20 pt-4 mt-2' : ''}`}>
                <h4 className="font-semibold text-base sm:text-lg lg:text-xl">{day.date || "Day"}</h4>
                <div className="flex flex-col items-center space-y-1">
                  <i className={`${icons[simplifiedCondition]} text-xl sm:text-2xl lg:text-3xl`}></i>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="text-xs sm:text-sm lg:text-base opacity-80">Precipitation</h4>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">{day.precipitation} mm</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="text-xs sm:text-sm lg:text-base opacity-80">Low</h4>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">{day.minTemp}°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="text-xs sm:text-sm lg:text-base opacity-80">High</h4>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">{day.maxTemp}°</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="text-xs sm:text-sm lg:text-base opacity-80">Air Quality</h4>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">{day.AirQuality?.["us-epa-index"]}</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="text-xs sm:text-sm lg:text-base opacity-80">Humidity</h4>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">{day.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-8">
          <StatCard title="Air Quality" value={weather?.AirQuality?.["us-epa-index"]} description={AirQualityDescription(weather?.AirQuality?.["us-epa-index"])} />
          <StatCard title="Feels Like" value={`${weather?.FeelsLike}°`} description={FeelsLikeDescription(weather?.FeelsLike)} />
          <StatCard title="Humidity" value={`${weather?.Humidity}%`} description={HumidityDescription(weather?.Humidity)} />
          <StatCard title="Wind" value={`${weather?.Wind?.windSpeed} km/h`} description={weather?.Wind?.windDirection} />
          <StatCard title="UV" value={weather?.UVIndex} description={getUVDescription(weather?.UVIndex)} />
          <StatCard title="Visibility" value={`${weather?.Visibility} km`} description={VisibilityDescription(weather?.Visibility)} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center bg-[#121212eb] w-full z-[-1]">
        <h3 className="text-[#d6d6d6] text-sm md:text-lg m-2">
          Weather Data is taken from <StyledLink href="https://www.weatherapi.com">www.weatherapi.com</StyledLink>.
        </h3>
        <h3 className="text-[#d6d6d6] text-sm md:text-lg m-2">
          Videos are taken from <StyledLink href="https://www.pexels.com">www.pexels.com</StyledLink> and <StyledLink href="https://www.pixabay.com">www.pixabay.com</StyledLink>.
        </h3>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, description }) => (
  <span className="flex flex-col opacity-85 items-center justify-start p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md dark:text-white text-center space-y-2 backdrop-blur-xl">
    <h3 className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">{title}</h3>
    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 lg:mb-8">{value}</h2>
    <h3 className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">{description}</h3>
  </span>
);

function StyledLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-[#d6d6d6] hover:text-[#ffffff] hover:text-xl transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default CurrentWeather;
