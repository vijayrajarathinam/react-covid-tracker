import { combineReducers } from "redux";
import initialState from "./initialState";
import { GET_ALL, GET_COUNTRIES, GET_LAST_FEW, GET_COUNTRIES_STREAMING } from "../constant";

const all = (state = initialState.all, action) => {
  if (action.type === GET_ALL) return action.payload;
  return state;
};

const countries = (state = initialState.countries, action) => {
  if (action.type === GET_COUNTRIES) return action.payload;
  return state;
};

const countriesStreaming = (state = initialState.countriesStreaming, action) => {
  if (action.type === GET_COUNTRIES_STREAMING) return { loading: false, data: [...state.data, action.payload] };
  //   return action.payload;
  return state;
};

const lastFewDays = (state = initialState.lastFewDays, action) => {
  if (action.type === GET_LAST_FEW) return action.payload;
  return state;
};

export default combineReducers({ all, countries, countriesStreaming, lastFewDays });
