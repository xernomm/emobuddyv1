import { Button, Col, Container, Row } from "react-bootstrap";
import EmpowermentImg from '../img/Empowerment Through Empathy.svg'
import '../style/icons.css'
export function Empowerment()
{
    return(
        <>
        <Container>
            <Row>
                <div className="d-flex justify-content-center">
                    <img className="empowerImg" src={EmpowermentImg} alt="" />
                </div>
                <br />
                <p className="embrace-orange">
                Embrace a transformative journey with EmoBuddy, where every step <br /> empowers you to navigate life's ups and downs with confidence and grace.
                </p>
            </Row>
            <Row>
                <div className="container d-lg-flex justify-content-center col-lg-12 hearts">
                    <div id="orangeHeart" className="col-lg-3 col-sm-12 py-5">
                        <p className="heartLead mt-3">
                        Instant Access Hub
                        </p>
                        <p className="heartContent">
                        Your Gateway to <br /> Immediate Insights <br /> and Support
                        </p>
                    </div>
                    <div id="pinkHeart" className="col-lg-3 col-sm-12 py-5">
                    <p className="heartLead mt-3">
                        Compassionate Support Network
                        </p>
                        <p className="heartContent">
                        Find your tribe in our <br /> supportive community, <br /> a space where empathy <br /> and understanding <br /> flourish.
                        </p>
                    </div>
                    <div id="greenHeart" className="col-lg-3 col-sm-12 py-5">
                    <p className="heartLead mt-3">
                    Discovery Pack
                        </p>
                        <p className="heartContent">
                        Your emotional well- <br />being toolkit, accessible <br />anywhere, anytime.
                        </p>
                    </div>
                    <div id="grayHeart" className="col-lg-3 col-sm-12 py-5">
                    <p className="heartLead mt-3">
                    Expert-Led Workshops
                        </p>
                        <p className="heartContent">
                        Connect and Evolve <br />Together Through <br /> our Coaching & <br /> Workshops Classes
                        </p>
                    </div>
                </div>
                
            </Row>
            <Row>
                <div className="d-flex justify-content-center col-12 ">
                <Button type="btn" className="btn btn-ytp-primary col-lg-2 py-3 mt-4">
                    SUBSCRIBE NOW
                </Button>
                </div>
            </Row>
        </Container>
        </>
    )
}