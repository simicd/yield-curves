import React from "react";
import { Home } from "./views/Home";
import "./App.css";
import { Subscription } from "./components/Subscribe/Subscribe";
import { Pricing } from "./components/Pricing/Pricing";

function App() {
  return (
    <>
      <Home />
      <Pricing></Pricing>
      <Subscription></Subscription>
    </>
  );
}

export default App;
