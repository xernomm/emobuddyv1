import { Button, Container, Row } from "react-bootstrap";
import howtoSubsImg from '../img/How to Subscribe.svg'
import one from '../img/1.svg'
import two from '../img/2.svg'
import three from '../img/3.svg'
import four from '../img/4.svg'
import '../style/base.css'


export function HowToSubscribe()
{
    return(
        <>
        <Container>
            <Row>
                <div className="d-flex justify-content-center ">
                    <img src={howtoSubsImg} className="empowerImg" alt="" />
                </div>
            </Row>
            <Row>
                <div className="d-lg-flex col-lg-12 col-sm-12 numberRows">
                    <div className="col-lg-9 col-sm-12 d-lg-flex justify-content-center">
                        <div className="col-lg-6 d-flex me-5">
                            <div className="col-lg-4 me-4">
                                <img src={one} alt="" className="col-12 numberSubs" />
                            </div>
                            <div className="col-lg-8 ms-3">
                                <p className="subsHeader">
                                Choose your plan
                                </p>
                                <p className="subsContent">
                                Pick the plan that fits <br /> your needs.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 ms-5 d-flex">
                            <div className="col-lg-4 me-4">
                                <img src={two} alt="" className="col-12 numberSubs" />
                            </div>
                            <div className="col-lg-8 ms-3">
                                <p className="subsHeader">
                                Sign Up
                                </p>
                                <p className="subsContent">
                                Quickly create <br /> your account.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        
                    </div>
                </div>
            </Row>
            <Row>
            <div className="d-lg-flex col-lg-12 col-sm-12  mt-5">
                        <div className="col-lg-3">
                        
                        </div>

                    <div className="col-lg-9 col-sm-12 d-lg-flex justify-content-center">
                        <div className="col-lg-6 d-flex me-5">
                            <div className="col-lg-4 me-4">
                                <img src={three} alt="" className="col-12 numberSubs" />
                            </div>
                            <div className="col-lg-8 ms-3">
                                <p className="subsHeader">
                                Make Payment
                                </p>
                                <p className="subsContent">
                                Make a secure payment.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex">
                            <div className="col-lg-4 me-4">
                                <img src={four} alt="" className="col-12 numberSubs" />
                            </div>
                            <div className="col-lg-8 ms-3">
                                <p className="subsHeader">
                                Dive in!
                                </p>
                                <p className="subsContent">
                                Access our <br /> portal instantly.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                <Button type="btn" className="btn btn-ytp-primary py-3 mt-5 col-2">
                SUBSCRIBE NOW
                </Button>
                </div>
            </Row>
        </Container>
        </>
    )
}