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
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

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
    <div className="flex items-center content-center justify-center w-screen h-screen font-sans bg-grey-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}>
        <div className="absolute inset-y-0 left-0 w-full h-1/2">
          <img
            className="object-cover w-full h-full opacity-75"
            src="https://source.unsplash.com/1FxMET2U5dU/1200 × 2800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Card payment"
          />
        </div>
      </motion.div>
      <form className="w-1/4 mt-48 bg-white rounded-lg shadow-lg p-7 " id="payment-form" onSubmit={handleSubmit}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            duration: 8,
          }}>
          <motion.div>
            <CardElement
              className="box-border h-10 min-w-full p-1 text-center border-2 border-dotted rounded shadow-xl border-cool-grey-50"
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.9 }}
            className="w-full h-8 text-white bg-teal-700 rounded shadow-xl hover:bg-teal-500"
            disabled={processing || disabled || succeeded}
            id="submit">
            <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay"}</span>
          </motion.button>
          {/* Show any error that happens when processing the payment */}
          <motion.div whileHover={{ scale: 1.1 }} className="mt-1 text-sm text-center text-cool-gray-700">
            {!disabled ? <motion.div></motion.div> : "Please enter your card number here"}{" "}
          </motion.div>
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
