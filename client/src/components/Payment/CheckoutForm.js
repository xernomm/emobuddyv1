import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';


const stripePromise = loadStripe("pk_test_51Op0UnERn2N86uFVBHRL3UdkZVv2DQ0flVajvnmFBSeAtAjFNKCqeTJIiVATbqaw5monJViYeddmBA6gGquJKxSk00tptNYpNc");

const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
  layout: {
    type: 'tabs',
    defaultCollapsed: false
  }
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch clientSecret from the server when the component mounts
    fetchClientSecretFromServer();
  }, []);


  const fetchClientSecretFromServer = async () => {
    try {
      const response = await fetch('/create-payment-intent');
      const data = await response.json();
      setClientSecret(data.clientSecret);
      console.log(data.clientSecret)
    } catch (error) {
      console.error('Error fetching clientSecret:', error);
      console.log(error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded or clientSecret is not set yet
      // Make sure to disable form submission until Stripe.js has loaded and clientSecret is set
      return;
    }

    // Confirm the payment using the clientSecret fetched from the server
    const result = await stripe.confirmPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
        // Add additional payment method information here if needed
      },
    });

    if (result.error) {
      // Show an error message to the user
      console.error(result.error.message);
    } else {
      // Payment succeeded
      console.log("Payment succeeded:", result.paymentIntent);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <Elements stripe={stripePromise} options={options}>
        <PaymentElement  />
      </Elements> 
      <button className='btn btn-ytp-primary mt-5' type='submit'>Submit Payment</button>
    </form>
  );
};

export default CheckoutForm;
