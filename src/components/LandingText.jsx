import { Button, Container, Row } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import chevron from '../img/chevron-orange.svg'
import { useState, useEffect } from 'react';
import '../style/font.css'


library.add(faChevronRight);
export function LandingText(){

    const [textIndex, setTextIndex] = useState(0);
    const words = ['understanding', 'journey', 'balance', 'self', 'tomorrow', 'harmony', 'future'];

    useEffect(() => {
        const interval = setInterval(() => {
          setTextIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 2000); 
    
        return () => clearInterval(interval); 
      }, []); 


    return(
        <>
        <Container>
            <Row>
                <div className="learn">
                    <p>
                    Learn about your
                    <br /> feelings for a better 
                    </p>
                    
                </div>
            </Row>
            <Row>
                <div className="d-lg-flex col-lg-12 chevronAndWords">
                    <div className="col-lg-4 col-sm-2 d-flex justify-content-end pe-5">
                    <img className="threeChevrons" src={chevron} alt="" />
                    </div>
                    <div className="col-lg-4 col-sm-8 mx-auto ">
                        <div className="chevron-container">
                            <p className="chevron">
                                {words[textIndex]} 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    </div>
                </div>
         
            </Row>
            <Row>
                <p className="embrace mt-4">
                Embrace a transformative journey with EmoBuddy, 
                <br />where every step empowers you to navigate life's 
                <br />ups and downs with confidence and grace.
                </p>
            </Row>
            <Row>
                <div className="d-flex justify-content-center mt-3 col-12">
                    <Button type="btn" className="btn btn-ytp-primary p-3 rounded signUpBtn col-lg-2">SIGN UP NOW</Button>
                </div>
            </Row>
        </Container>
        </>
    )
}