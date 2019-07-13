import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LanguageReducer, PagesReducer, ViewReducer } from "./reducers";
import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar/NavBar";
import * as serviceWorker from "./serviceWorker";
import SearchComponent from "./components/Search/Search";

const logger = createLogger();
const rootReducer = combineReducers({
  LanguageReducer,
  PagesReducer,
  ViewReducer
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <NavBar />
      <Route path="/:title?" component={App} />
      <Route path="/search" exact component={SearchComponent} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
