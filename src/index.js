import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SettingsReducer, PagesReducer, ViewReducer } from "./reducers";
import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar/NavBar";
import * as serviceWorker from "./serviceWorker";
import SearchComponent from "./components/Search/Search";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const logger = createLogger();
const rootReducer = combineReducers({
  SettingsReducer,
  PagesReducer,
  ViewReducer
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route path="/:title?" component={App} />
        <Route path="/search" exact component={SearchComponent} />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
