import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import "./App.css";
import { Playground } from "./views/Playground";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/playground" component={Playground} />
      </Layout>
    </>
  );
}

export default App;
