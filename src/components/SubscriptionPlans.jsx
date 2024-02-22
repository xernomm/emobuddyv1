import { Button, Container, Row } from "react-bootstrap";
import SubsPlansImg from '../img/Subscription Plans.svg'
import bronze from '../img/Bronze.svg'
import silver from '../img/Silver.svg'
import gold from '../img/Gold.svg'


export function SubscriptionPlans()
{
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
                            <Button type="btn" className="btn col-10 rounded rounded-4 py-3" id="yellowPlanBtn">
                                SELECT PLAN
                            </Button>
                        </div>
                     <div  className=" d-flex justify-content-center col-4 mx-3 ">
                            <Button type="btn" className="btn col-10 rounded rounded-4 py-3" id="redPlanBtn">
                                SELECT PLAN
                            </Button>
                        </div>
                        <div className=" d-flex justify-content-center col-4 mx-3">
                            <Button type="btn" className="btn col-10 rounded rounded-4 py-3" id="greenPlanBtn">
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
        </Container>
        </>
    )
}