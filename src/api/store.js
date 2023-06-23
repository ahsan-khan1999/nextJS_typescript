import { configureStore } from "@reduxjs/toolkit";
import reducer from "./mainReducer/main";
import { combineReducers } from "@reduxjs/toolkit";


const reducers = combineReducers(reducer);

export const store = configureStore({
  reducer:reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
