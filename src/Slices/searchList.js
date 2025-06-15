import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchList: {},
  searchOrder: [],
};

export const searchListSlice = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    addSearchItem: (state, action) => {
      const cityKey = action.payload.City.toLowerCase();
      if(!state.searchOrder.includes(cityKey)) {
        state.searchOrder.push(cityKey);
      }
      state.searchList[cityKey] = {
        City: action.payload.City,
        Country: action.payload.Country,
        Temperature: action.payload.Temperature,
        Condition: action.payload.Condition,
        Time: action.payload.Time,
        hourlyForecast: action.payload.hourlyForecast,
        dailyForecast: action.payload.dailyForecast,
        Precipitation: action.payload.Precipitation,
        AirQuality: action.payload.AirQuality,
        Humidity: action.payload.Humidity,
        Wind:action.payload.Wind,
        FeelsLike: action.payload.FeelsLike,
        UVIndex: action.payload.UVIndex,
        Visibility: action.payload.Visibility,
      };
    }
  }
});

export const { addSearchItem } = searchListSlice.actions;
export default searchListSlice.reducer;
