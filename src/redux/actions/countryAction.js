import { all, countries, lastfewdays } from "../../data";
import { GET_ALL, GET_COUNTRIES, GET_LAST_FEW, GET_COUNTRIES_STREAMING } from "../constant";

const TIMEOUT = 3000;

export function getAll() {
  return function (dispatch) {
    dispatch({ type: GET_ALL, payload: { loading: true, data: [] } });

    setTimeout(function () {
      dispatch({ type: GET_ALL, payload: { loading: false, data: all } });
    }, TIMEOUT);
  };
}

export function getCountries() {
  return function (dispatch) {
    dispatch({ type: GET_COUNTRIES, payload: { loading: true, data: [] } });

    setTimeout(function () {
      dispatch({ type: GET_COUNTRIES, payload: { loading: false, data: countries } });
    }, TIMEOUT);
  };
}

export function getLastFewDays() {
  return function (dispatch) {
    dispatch({ type: GET_LAST_FEW, payload: { loading: true } });

    setTimeout(function () {
      dispatch({ type: GET_LAST_FEW, payload: { loading: false, data: lastfewdays } });
    }, TIMEOUT);
  };
}

export function getCountiesStreaming() {
  return function (dispatch) {
    for (const country in countries) {
      setTimeout(function () {
        dispatch({ type: GET_COUNTRIES_STREAMING, payload: countries[country] });
      }, TIMEOUT);
    }
  };
}
