import {configureStore} from '@reduxjs/toolkit';
import searchListReducer from '../Slices/searchList';
export const store = configureStore({
    reducer: {
        searches: searchListReducer
    }
});