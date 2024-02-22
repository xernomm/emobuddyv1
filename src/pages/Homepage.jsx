import React, { useEffect, useRef, useState } from "react"
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
    
    const [activePage, setActivePage] = useState("home");
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        whyEmoBuddy: useRef(null),
        pricing: useRef(null),
        contact: useRef(null)
    };

    useEffect(() => {
        const handleIntersections = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActivePage(entry.target.id);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Intersection ratio threshold for triggering callback
        };

        const observer = new IntersectionObserver(handleIntersections, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);



    return(
        <>
        <CustomNavbar activePage={activePage} />
        <div className="body-bg">
            <Row ref={sectionRefs.home} id="home">
                <LandingText />
            </Row>
            <Row ref={sectionRefs.about} id="about" className="newRow">
                <Empowerment />
            </Row>
            <Row ref={sectionRefs.whyEmoBuddy} id="why-emobuddy">
                <WhyEmoBuddy />
            </Row>
            <Row className="newRow mt-3">
                <HowToSubscribe />
            </Row>
            <Row ref={sectionRefs.pricing} id="pricing" className="newRow">
                <SubscriptionPlans />
            </Row>
            <Row className="newRow">
                <FrequentQuestions />
            </Row>
            <Row ref={sectionRefs.contact} id="contact" className="mt-3">
                <AskUsForm />
            </Row>
            <Row className="newRow">
                <Footer />
            </Row>
        </div>
    </>
        
    )
}