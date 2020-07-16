import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import GA from './utils/GoogleAnalytics.jsx'

import "./assets/main.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
    <Switch>
    { GA.init() && <GA.RouteTracker /> }
      <App />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// When developing, it's better to hot reloading to see changes immediately
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
