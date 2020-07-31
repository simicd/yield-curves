import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import "./App.css";
import { Playground } from "./views/Playground";
import { Layout } from "./components/Layout/Layout";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./views/Checkout/CheckoutForm";

const promise = loadStripe(
  "pk_test_51H2hX9BT829BW03KzheY9QfICpGEzuUDvDqaa5Tgnhyu0hpyMkdh6J6DbU5O6qHRjQD3b8j4L9GS8CPiOOKDzmio00L6NYrRBa"
);

function App() {
  return (
    <>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/playground" component={Playground} />
        <Elements stripe={promise}>
          <Route exact path="/payment" component={CheckoutForm} />
        </Elements>
      </Layout>
    </>
  );
}

export default App;
