import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import "./App.css";
import { Playground } from "./views/Playground";

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/playground" component={Playground} />
    </>
  );
}

export default App;
