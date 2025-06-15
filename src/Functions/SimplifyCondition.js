function simplifyCondition(conditionText, time) {
  const condition = conditionText.toLowerCase();
  const hour = parseInt(time.split(" ")[1].split(":")[0]);
  const isDay = hour >= 6 && hour < 18;

  if (!isDay) {
    if (condition.includes("clear")) return "NightClear";
    if (condition.includes("cloudy") || condition.includes("overcast")) return "NightCloudy";
    if (condition.includes("snow")) return "NightSnowy";
  }

  if (condition.includes("sunny") || condition === "clear") return "sunny";

  if (condition.includes("cloudy") || condition.includes("overcast")) return "cloudy";

  if (
    condition.includes("rain") || 
    condition.includes("drizzle") || 
    condition.includes("shower")
  ) return "rainy";

  if (
    condition.includes("snow") || 
    condition.includes("sleet") || 
    condition.includes("blizzard") || 
    condition.includes("ice pellets")
  ) return "snowy";

  if (
    condition.includes("thunder") || 
    condition.includes("storm")
  ) return "thuderstorm"; // Note: typo in your object should be 'thunderstorm'

  if (
    condition.includes("fog") || 
    condition.includes("mist") || 
    condition.includes("haze")
  ) return "foggy";

  return "sunny"; // default fallback
}
export default simplifyCondition;

function isNightTime() {
  const now = new Date();
  const hour = now.getHours(); // 0 to 23

  return (hour >= 19 || hour < 6); // 7 PM to 6 AM is considered night
}

export {isNightTime};
