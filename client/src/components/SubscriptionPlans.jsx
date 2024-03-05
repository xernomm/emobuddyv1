import { Button, Container, Row } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import SubsPlansImg from '../img/Subscription Plans.svg'
import bronze from '../img/Bronze.svg'
import silver from '../img/Silver.svg'
import gold from '../img/Gold.svg'
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// REACT_APP_BRONZE_PACKAGE_KEY="price_1Op0hlERn2N86uFVSoDu5z1D"
// REACT_APP_SILVER_PACKAGE_KEY="price_1Op0luERn2N86uFV1Imjmrgs"
// REACT_APP_GOLD_PACKAGE_KEY="price_1Op0mWERn2N86uFVZAUTByYT"


export function SubscriptionPlans()
{
  
    const baseUrl = process.env.REACT_APP_BASE_URL
    const bronzePckg = process.env.REACT_APP_BRONZE_PACKAGE_KEY;
    const silverPckg = process.env.REACT_APP_SILVER_PACKAGE_KEY;
    const goldPckg = process.env.REACT_APP_GOLD_PACKAGE_KEY;

    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        // Initialize Stripe.js when the component mounts
        const initializeStripe = async () => {
          const stripeObject = await stripePromise;
          setStripe(stripeObject);
        };
    
        initializeStripe();
      }, []);

      const handleCheckout = async (priceId) => {
 
        const protocol = window.location.protocol;
        const apiUrl = `${protocol}//${baseUrl}/create-checkout-session`;
        console.log(apiUrl)

        if (!stripe) {
            console.error('Stripe.js has not been loaded yet.');
            return;
          }
        
        // Fetch client secret from server
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId }),
          });
          const { sessionId, error } = await response.json();
        
          if (error) {
            console.error('Error creating Checkout Session:', error.message);
            // Handle error (e.g., show error message to the user)
          } else {
            // Redirect user to the Stripe Checkout page with the Checkout Session ID
            const { error } = await stripe.redirectToCheckout({
              sessionId: sessionId,
            });
        
            if (error) {
              console.error('Error redirecting to Checkout:', error.message);
              // Handle error (e.g., show error message to the user)
            }
          }
      };

    return (
        <>
        <Container>
            <Row>
                <div className="my-5 d-lg-flex justify-content-center">
                    <img src={SubsPlansImg} alt="" className="empowerImg" />
                </div>
            </Row>
            <Row className="cards">
                <div className="d-lg-flex col-lg-12 justify-content-center pricingBoxes">
                    <div className="col-lg-4 mx-3">
                        <div className="priceBox col-10 mx-auto rounded rounded-5">
                            <p className="priceInfo">
                            USD15 <span className="smallerPriceInfo">/per month</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 mx-3">
                        <div className="priceBox col-10 mx-auto rounded rounded-5">
                            <p className="priceInfo">
                            USD88 <span className="smallerPriceInfo">/per quarter</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 mx-3">
                        <div className="priceBox col-10 mx-auto rounded rounded-5">
                            <p className="priceInfo">
                            USD850 <span className="smallerPriceInfo">/per year</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="d-lg-flex col-lg-12 justify-content-center packageBoxesRow">
                    {/* PACKAGE BOXES */}
                    <div className="col-lg-4 mx-3 ">
                        <div className="col-12 packageBox rounded rounded-4">
                        <div className="col-lg-12 d-flex">
                            <div className="col-6">
                                <img src={bronze} alt="" className="colorImg col-12" />
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div id="levelBoxYellow" className="col-8 rounded rounded-5 ms-4">
                                    <p className="levelText  my-auto py-1">
                                        Entry-level
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="packageInfoSection">
                        <div className="packageInfo mt-4">
                                    <p className="packageInfoLead">
                                    Unlimited Access to OnDemand Hub
                                    </p>
                                    <ul className="packageInfoPoints">
                                        <li>
                                        Watch tailormade videos on emotional <br /> resilience and mental toughness
                                        </li>
                                        <li>
                                        Access resources and guides that help <br /> the parent understand the challenges <br /> facing modern-day children
                                        </li>
                                    </ul>
                                </div>
                                <div className="packageInfo mt-4">
                                    <p className="packageInfoLead">
                                    EmoBuddy On-Demand Chatbot
                                    </p>
                                    <ul className="packageInfoPoints">
                                        <li>
                                        Real-time access to the AI-powered <br /> emotional support chatbot
                                        </li>
                                    </ul>
                                </div>
                        </div>

                        </div>
                    </div>

                    <div className="col-lg-4 mx-3 ">
                        <div className="col-12 packageBox rounded rounded-4">
                        <div className="col-lg-12 d-flex">
                            <div className="col-6">
                                <img src={silver} alt="" className="colorImg col-12" />
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div id="levelBoxRed" className="col-10 rounded rounded-5 ms-4">
                                    <p className="levelText  my-auto py-1">
                                        Popular Choice
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="packageInfoSection">
                        <div className="packageInfo mt-4">
                                        <p className="packageDesc">
                                        * billed monthly <br />
                                        * USD29/month <br />
                                        * all of <span className="fw-bold">Bronze Plan +</span>
                                        </p>
                                </div>
                                <div className="packageInfo mt-4">
                                    <p className="packageInfoLead">
                                    EmoBuddy Discovery Box
                                    </p>
                                    <ul className="packageInfoPoints">
                                        <li>
                                        Delivered directly to your home  <br /> once every 3 months
                                        </li>
                                        <li>
                                        Up to 20 curated activities that help   
                                        <br /> adolescents deal with emotions and
                                        <br /> develop a growth mindset
                                        </li>
                                    </ul>
                                </div>
                        </div>

                        </div>
                    </div>

                    <div className="col-lg-4 mx-3 ">
                        <div className="col-12 packageBox rounded rounded-4">
                        <div className="col-lg-12 d-flex">
                            <div className="col-6">
                                <img src={gold} alt="" className="colorImg col-12" />
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div id="levelBoxGreen" className="col-11 rounded rounded-5 ms-4">
                                    <p className="levelText my-auto py-1">
                                        Recommended
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="packageInfoSection">
                        <div className="packageInfo mt-4">
                        <p className="packageDesc">
                                        * billed monthly <br />
                                        * USD70/month <br />
                                        * all of <span className="fw-bold">Bronze Plan + Silver Plan +</span>
                                        </p>
                                </div>
                                <div className="packageInfo mt-4">
                                    <p className="packageInfoLead">
                                    EmoBuddy Coaching & Workshops
                                    </p>
                                    <ul className="packageInfoPoints">
                                        <li>
                                        Monthly online workshops on relevant   <br /> topics
                                        </li>
                                        <li>
                                        Physical EmoBuddy camps twice a year
                                        </li>
                                        <li>
                                        1:1 online coaching sessions once   
                                        <br /> every quarter
                                        </li>
                                    </ul>
                                </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </Row>

            <div className="buttonRows">
                <div className="d-lg-flex justify-content-center col-lg-12">
                        <div className=" d-flex justify-content-center col-4 mx-3">
                            <Button onClick={() => handleCheckout(bronzePckg)} type="btn" className="btn col-10 rounded rounded-4 py-3" id="yellowPlanBtn">
                                SELECT PLAN
                            </Button>
                        </div>
                     <div  className=" d-flex justify-content-center col-4 mx-3 ">
                            <Button onClick={() => handleCheckout(silverPckg)} type="btn" className="btn col-10 rounded rounded-4 py-3" id="redPlanBtn">
                                SELECT PLAN
                            </Button>
                        </div>
                        <div className=" d-flex justify-content-center col-4 mx-3">
                            <Button onClick={() => handleCheckout(goldPckg)} type="btn" className="btn col-10 rounded rounded-4 py-3" id="greenPlanBtn">
                                SELECT PLAN
                            </Button>
                        </div>
                </div>
            </div>
            <Row>
                <div className="d-flex justify-content-center col-12 mt-5">
                    <Button type="btn" className="col-2 py-3 btn btn-ytp-outline-primary rounded rounded-3 mt-5">
                        SIGN UP NOW
                    </Button>
                </div>
            </Row>
            <div>
    </div>
        </Container>
        </>
    )
}