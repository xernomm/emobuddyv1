import { Button, Container, Form, Row } from "react-bootstrap";
import Emobuddy from '../img/emobuddy logo.svg'
import fb from '../img/facebook.svg'
import ig from '../img/instagram.svg'
import tt from '../img/tiktok.svg'
export function Footer()
{
    return (
        <>
        <Container className="px-5">
            <Row className="px-5">
                <div className="d-lg-flex col-12 container ">
                    <div className="col-lg-1">
                        <img src={Emobuddy} alt="" className="col-12" />
                    </div>
                    <div className="col-lg-11 d-flex justify-content-end my-auto">
                        <div className="col-3 mt-3">
                            <p className="text-center interBlue px16">
                                Send us email at
                            </p>
                        </div>
                        <div className="col-3 my-auto">
                        <a href="mailto:wecare@emobuddy.com?cc=&bcc=&subject=Subject&body=Body%20Text" class="btn btn-ytp-primary rounded rounded-3 py-3">
                            wecare@emobuddy.com
                        </a>
                        </div>
                    </div>
                </div>
                <hr className="mt-4" />
            </Row>
            <Row className="px-5">
                <div className="d-lg-flex col-lg-12 mt-5">
                    <div className="col-lg-3 col-sm-12">
                        <p className="interBlue px16 mb-5">
                        Tower A, Menara UOA <br /> Bangsar, Jalan Bangsar <br /> Utama 1 59000 KL
                        </p>
                        <a href="mailto:wecare@emobuddy.com?cc=&bcc=&subject=Subject&body=Body%20Text" className="mt-5 interBlue px16">
                        wecare@emobuddy.com
                        </a>
                        <p className="interBlue px-16 mt-3">
                        603 2302 2943  
                        </p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <ul className="noStyle">
                            <li>
                            <a href="/home" className="interBlue px16">
                            Home
                            </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            About Us
                        </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            Why EmoBuddy?
                        </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            How to Subscribe
                        </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            Subscription Plans
                        </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            FAQ
                        </a>
                            </li>
                            <li>
                            <a href="/home" className="interBlue px16">
                            Contact Us
                        </a>
                            </li>
                        </ul>
                       
                        

                       

                       
                       
                       
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        
                        <ul className="noStyle">
                            <li>
                            <p className="fw-bold interBlue px16">
                            Other Services
                        </p>
                            </li>
                            <li>
                            <a href="" className="interBlue px16">
                            Youthopia
                        </a>
                            </li>
                            <li>
                            <a href="" className="interBlue px16">
                            XtraSchool
                        </a>
                            </li>
                            <li>
                            <a href="" className="interBlue px16">
                            Youthopia Labs
                        </a>
                            </li>
                        </ul>

                        
                       
                        
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <div className="d-flex my-5">
                            <a href="">
                            <img src={fb} alt="" className="me-3" />
                            </a>
                            <a href="">
                            <img src={ig} alt="" className="me-3" />
                            </a>
                            <a href="">
                            <img src={tt} alt="" className="me-3" />
                            </a>
                        </div>

                        <p className="fw-bold interBlue px16 mt-4">
                            Sign Up for our Newsletter
                        </p>

                        <Form>
                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            id="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="rounded rounded-5 col-12"
                                            style={{ height: '60px', width: '125%' }}

                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">Email Address</label>
                                        </Form.Floating>
                        </Form>
                    </div>
                </div>
            </Row>

            <Row className="px-5 mt-5">
                <div className="col-lg-12 d-lg-flex">
                    <div className="col-lg-6 col-sm-12">
                        <p className="interBlue px16">
                        © 2024 XtraSchool Sdn. Bhd. All rights reserved.
                        </p>
                    </div>
                    <div className="col-lg-6 d-flex justifty-content-end">
                        <div className="col-4">

                        </div>
                        <div className="col-8 d-flex ms-5">
                            <a href="" className="interBlue px16">Terms and service</a>
                            <a href="" className="interBlue px16 ms-5">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    )
}