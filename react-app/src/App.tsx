import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import "./App.css";
import { Playground } from "./views/Playground";
import { Layout } from "./components/Layout/Layout";
import { AppInsightsContextProvider } from "./utils/AppInsights";
// import { DogImage } from "./views/DogImage";
import { DogImageWithButton } from "./views/DogImageWithButton";

function App() {
  return (
    <>
      <AppInsightsContextProvider>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/playground" component={Playground} />
          <Route exact path="/dog" component={DogImageWithButton} />
        </Layout>
      </AppInsightsContextProvider>
    </>
  );
}

export default App;
