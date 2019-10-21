import React, { Component } from "react";
import { Provider } from "react-redux";
import Main from "./views/Main";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk"
import logger from "redux-logger"

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
