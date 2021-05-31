import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducer";

export default function configureStore(initialstate) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux devtools

  return createStore(rootReducer, initialstate, composeEnhancers(applyMiddleware(thunk)));
}
