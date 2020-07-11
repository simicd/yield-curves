import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import "./App.css";
import { Charts } from "./views/Charts";

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/charts" component={Charts} />
    </>
  );
}

export default App;
