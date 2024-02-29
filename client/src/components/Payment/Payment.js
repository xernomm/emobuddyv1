import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Container, Row } from "react-bootstrap";

const stripePromise = loadStripe("pk_test_51Op0UnERn2N86uFVBHRL3UdkZVv2DQ0flVajvnmFBSeAtAjFNKCqeTJIiVATbqaw5monJViYeddmBA6gGquJKxSk00tptNYpNc");

export default function Payment() {
  return (
    <>
      <Container>
        <Row>
          <h1 className="display-4">
            Payment 
          </h1>
          <div className="mt-5 p-5 container border border-dark rounded rounded-5 col-lg-6">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </Row>
      </Container>
    </>
  );
};
