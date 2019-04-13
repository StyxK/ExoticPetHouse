import React, { Component } from "react";
import { Provider } from "react-redux";
import Main from "./views/Main";
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
