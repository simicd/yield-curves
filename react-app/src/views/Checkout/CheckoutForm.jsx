import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import "./Checkout_copy.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://127.0.0.1:7071/stripe-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service: { id: "xs-tshirt" } }),
      })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    // console.log(clientSecret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });
    console.log(payload);

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <div className="flex items-center content-center justify-center w-screen h-screen font-sans bg-cool-gray-50 ">
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition= {{
          duration: 1
        }}>
      <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-full lg:h-1/2">
        <img
          className="object-cover w-full h-full opacity-20"
          src="https://source.unsplash.com/ULwzqOnPem0/1200 × 2800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
      </motion.div>
      <form className="w-1/4 mt-48 bg-white rounded shadow-2xl p-7 " id="payment-form" onSubmit={handleSubmit}>
      <motion.div
        initial={{ scale: 0}}
        animate={{ scale: 1}}
        transition= {{
          type: "spring",
          duration: 8
        }}>
        <CardElement
          className="box-border h-10 p-1 text-center border-2 border-gray-100 border-solid rounded shadow-xl "
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="w-full h-8 text-white bg-indigo-900 rounded shadow-xl hover:bg-indigo-700"
          disabled={processing || disabled || succeeded}
          id="submit">
          <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay"}</span>
        </button>
        {/* Show any error that happens when processing the payment */}
        <div className="mt-1 text-sm text-center text-cool-gray-700">{! disabled ? <div></div>: "Please enter your card number here"} </div>
        </motion.div>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
        </p>
      </form>
    </div>
  );
}
