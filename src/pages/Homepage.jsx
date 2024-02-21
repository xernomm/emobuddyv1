import React from "react"
import { CustomNavbar } from "../components/Navbar"
import '../style/base.css'
import { LandingText } from "../components/LandingText"
import { Empowerment } from "../components/Empowerment"
import { Row } from "react-bootstrap"
import { WhyEmoBuddy } from "../components/WhyEmobuddy"
import { HowToSubscribe } from "../components/HowToSubscribe"
import { SubscriptionPlans } from "../components/SubscriptionPlans"
import { FrequentQuestions } from "../components/FrequentQuestions"
import { AskUsForm } from "../components/AskUsForm"
import { Footer } from "../components/Footer"

export function Homepage(){
    return(
        <>
        <CustomNavbar activePage={"home"}/>
        <div className="body-bg">
            <Row>
                <LandingText />
            </Row>
            <Row className="newRow">
                <Empowerment />
            </Row>
            <Row >
                <WhyEmoBuddy />
            </Row>
            <Row className="newRow mt-3">
                <HowToSubscribe />
            </Row>
            <Row className="newRow">
                <SubscriptionPlans />
            </Row>
            <Row className="newRow">
                <FrequentQuestions />
            </Row>
            <Row className="mt-3">
                <AskUsForm />
            </Row>
            <Row className="newRow">
                <Footer />
            </Row>
        </div>
        </>
        
    )
}