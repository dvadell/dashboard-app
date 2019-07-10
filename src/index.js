import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LanguageReducer, PagesReducer } from "./reducers";
import "./index.css";
import App from "./App";
import Project from "./plugins/Project/Project";
import Agenda from "./plugins/Agenda/Agenda";
import NavBar from "./components/NavBar/NavBar";
import * as serviceWorker from "./serviceWorker";
import SearchComponent from "./components/Search/Search";

const logger = createLogger();
const rootReducer = combineReducers({ LanguageReducer, PagesReducer });
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <NavBar />
      <Route path="/" exact component={App} />
      <Route path="/pr/:title?" component={Project} />
      <Route path="/ag/:title?" component={Agenda} />
      <Route path="/search" exact component={SearchComponent} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
