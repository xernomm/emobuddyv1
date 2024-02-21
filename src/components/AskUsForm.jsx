import { Button, Container, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export function AskUsForm()
{
    return(
        <>
        <Container>
            <Row>
                <div className="d-flex justify-content-center col-12">
                    <div className="askUsBg col-lg-11 ">
                        <div className="my-4">
                            <p className="askLead">
                                Ask us anything!
                            </p>
                            <p className="askSublead">
                            Have questions but can’t find the answer? Send us a message!
                            </p>
                        </div>
                        <div className="askUsSection">
                            <Form className="askUsForm">
                                <div className="col-lg-12 d-lg-flex justify-content-center">
                                    <div className="col-lg-6">
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            className="rounded rounded-5"
                                            id="subject"
                                            type="text"
                                            style={{ height: '70px' }}
                                            placeholder="Subject"
                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">Subject</label>
                                        </Form.Floating>
                                        <Form.Floating className="labelsta ps-0" controlId="message">
                                            <Form.Control
                                            className="rounded rounded-4 "
                                            as="textarea"
                                            placeholder="Message"
                                            style={{ height: '243px' }}
                                            />
                                            <label className="labels mb-4" htmlFor="">Message</label>

                                        </Form.Floating>
                                    </div>
                                    <div className="col-lg-6 px-4">
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            id="firstName"
                                            className="rounded rounded-5"
                                            type="text"
                                            placeholder="First Name"
                                            style={{ height: '70px' }}

                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">First Name</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}

                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">Last Name</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            id="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}

                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">Email Address</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control
                                            id="contactNo"
                                            type="tel"
                                            placeholder="Contact No."
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}

                                            />
                                            <label className="labels" htmlFor="floatingInputCustom">Contact No.</label>
                                        </Form.Floating>
                                    </div>
                                </div>
                            
                                <div className="col-lg-12 d-lg-flex justify-content-center">
                                    <Button type="submit" className="btn col-2 py-3 rounded rounded-3 askUsBtn">
                                        SUBMIT
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    )
}