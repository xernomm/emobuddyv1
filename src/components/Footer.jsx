import { Button, Container, Form, Row } from "react-bootstrap";
import Emobuddy from '../img/emobuddy logo.svg'
import * as Icon from 'react-bootstrap-icons'
import fb from '../img/facebook.svg'
import ig from '../img/instagram.svg'
import Swal from "sweetalert2";
import { useState } from "react";
export function Footer()
{
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
    
        if (form.checkValidity() === true) {
            event.preventDefault()
            Swal.fire({
              title: "Do you want to save the changes?",
              icon: 'info',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: `Don't save`
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                form.submit(); // Submit the form
                setValidated(true);
              } else if (result.isDenied) {
                event.preventDefault();
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }
      };
      
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
                            <a href="https://www.facebook.com/youthopiaHQ/" rel="noreferrer" target="_blank">
                            <img src={fb} alt="" className="me-3" />
                            </a>
                            <a href="https://www.instagram.com/youthopiahq" rel="noreferrer" target="_blank">
                            <img src={ig} alt="" className="me-3" />
                            </a>
                        </div>

                        <p className="fw-bold interBlue px16 mt-4">
                            Sign Up for our Newsletter
                        </p>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-end">
                             <Button className="btn btn-outline-secondary btnSubs" type="submit">
                                    <Icon.SendFill className="interBlue" />
                                </Button>
                            </div>

                            <div className="input-group mb-3">
                                <Form.Floating>
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="rounded rounded-5"
                                        style={{ height: '60px', width: '130%' }}
                                        required
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <label className="labels" htmlFor="floatingInputCustom">Email Address</label>
                                </Form.Floating>
                                
                            </div>
                        </Form>

                    </div>
                </div>
            </Row>

            <Row className="ps-5 mt-5">
                <div className="col-lg-12 d-lg-flex">
                    <div className="col-lg-6 col-sm-12">
                        <p className="interBlue px16">
                        © 2024 XtraSchool Sdn. Bhd. All rights reserved.
                        </p>
                    </div>
                    <div className="col-lg-6 d-flex justifty-content-end">
                        <div className="col-6">

                        </div>
                        <div className="col-6 d-flex ms-5">
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