import React from "react";
import { Home } from "./views/Home";
import "./App.css";
import { Subscription } from "./components/Subscribe/Subscribe";

function App() {
  return (
    <>
      <Home />
      <Subscription></Subscription>
    </>
  );
}

export default App;
