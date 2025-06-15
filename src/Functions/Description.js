function HumidityDescription(humidity) {
  if (humidity < 30) {
    return "Air is dry.";
  } else if (humidity <= 60) {
    return "Humidity is comfortable.";
  } else {
    return "Air is humid.";
  }
}

function AirQualityDescription(index) {
  // Assuming index is US EPA Air Quality Index (0-500 scale)
  if (index <= 50) {
    return "Air quality is good.";
  } else if (index <= 100) {
    return "Air quality is moderate.";
  } else if (index <= 150) {
    return "Air quality is unhealthy for sensitive groups.";
  } else if (index <= 200) {
    return "Air quality is unhealthy.";
  } else if (index <= 300) {
    return "Air quality is very unhealthy.";
  } else {
    return "Air quality is hazardous.";
  }
}

// For air quality, we usually consider pollutants like:
// PM2.5, PM10 (particulate matter), CO (carbon monoxide), NO2 (nitrogen dioxide), O3 (ozone), SO2 (sulfur dioxide), and sometimes CO2.

function VisibilityDescription(visibilityKm) {
  if (visibilityKm >= 10) {
    return "Visibility is clear.";
  } else if (visibilityKm >= 5) {
    return "Visibility is moderate.";
  } else {
    return "Visibility is poor.";
  }
}

function FeelsLikeDescription(tempDiff) {
  // tempDiff = feelsLikeTemperature - actualTemperature
  if (tempDiff > 3) {
    return "Feels warmer than actual.";
  } else if (tempDiff < -3) {
    return "Feels cooler than actual.";
  } else {
    return "Feels like the actual temperature.";
  }
}

function getUVDescription(uvIndex) {
  if (uvIndex < 3) {
    return "Low risk - Safe to be outside";
  } else if (uvIndex < 6) {
    return "Moderate risk - Take precautions";
  } else if (uvIndex < 8) {
    return "High risk - Protection needed";
  } else if (uvIndex < 11) {
    return "Very high risk - Extra protection needed";
  } else {
    return "Extreme risk - Avoid sun exposure";
  }
}

export {
  HumidityDescription,
  AirQualityDescription,
  VisibilityDescription,
  FeelsLikeDescription,
  getUVDescription
};