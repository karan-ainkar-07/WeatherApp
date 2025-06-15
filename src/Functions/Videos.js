import "weather-icons/css/weather-icons.css";

const videos={
    cloudy: "/cloudy.mp4",
    sunny: "/clearSunny.mp4",
    rainy: "/rainy.mp4",
    snowy: "/snowy.mp4",
    thunderstorm: "/thunderstorm.mp4",
    foggy: "/foggy.mp4",

    NightCloudy: "/night-cloudy.mp4",
    NightSnowy: "/night-snowy.mp4",
    NightClear: "/night-clear.mp4",
}

const icons={
    cloudy: " wi wi-cloudy",
    sunny: " wi wi-day-sunny",
    rainy: " wi wi-rain",
    snowy: " wi wi-snow",
    thunderstorm: " wi wi-thunderstorm",
    foggy: " wi wi-fog",

    NightCloudy: " wi wi-night-alt-cloudy",
    NightSnowy: " wi wi-night-alt-snow",
    NightClear: " wi wi-night-clear",
}
const color = {
  NightSnowy: "bg-gradient-to-t from-[#505050] to-[#353535]",
  rainy: "bg-gradient-to-t from-[#505050] to-[#353535]",
  thunderstorm: "bg-gradient-to-t from-[#505050] to-[#353535]",
  NightCloudy: "bg-gradient-to-t from-[#505050] to-[#353535]",
  foggy: "bg-gradient-to-t from-[#5b5b5b] to-[#979797]",
  NightClear: "bg-gradient-to-t from-[#021f4f] to-[#002e7a]",
  snowy: "bg-gradient-to-t from-[#929292] to-[#dfdfdf]",
  sunny: "bg-gradient-to-t from-[#005cb8] to-[#54a3f2]",
  cloudy: "bg-gradient-to-t from-[#005cb8] to-[#54a3f2]",
};

export {icons,color};
export default videos;