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
      const payload = action.payload;
      const cityKey = payload.City.toLowerCase();

      // Add to order only if not already added
      if (!state.searchOrder.includes(cityKey)) {
        state.searchOrder.push(cityKey);
      }

      // List of fields to copy from payload
      const fields = [
        'City',
        'Country',
        'Temperature',
        'Condition',
        'Time',
        'hourlyForecast',
        'dailyForecast',
        'Precipitation',
        'AirQuality',
        'Humidity',
        'Wind',
        'FeelsLike',
        'UVIndex',
        'Visibility',
      ];

      // Build the object safely using reduce
      state.searchList[cityKey] = fields.reduce((acc, field) => {
        acc[field] = field in payload ? payload[field] : null;
        return acc;
      }, {});
    },
  },
});

export const { addSearchItem } = searchListSlice.actions;
export default searchListSlice.reducer;
