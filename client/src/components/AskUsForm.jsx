import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'

export function AskUsForm()
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
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="askUsForm">
                                <div className="col-lg-12 d-lg-flex justify-content-center">
                                    <div className="col-lg-6">
                                        <Form.Floating className="mb-3">
                                            <Form.Control required
                                            className="rounded rounded-5"
                                            id="subject"
                                            type="text"
                                            style={{ height: '70px' }}
                                            placeholder="Subject"
                                            />
                                             <Form.Control.Feedback type="invalid">Subject cannot be empty.</Form.Control.Feedback>
                                            <label className="labels" htmlFor="floatingInputCustom">Subject</label>
                                        </Form.Floating>
                                        <Form.Floating className="labelsta ps-0" controlId="message">
                                            <Form.Control required
                                            className="rounded rounded-4 "
                                            as="textarea"
                                            placeholder="Message"
                                            style={{ height: '243px' }}
                                            />
                                            <label className="labels mb-4" htmlFor="">Message</label>
                                            <Form.Control.Feedback type="invalid">Message cannot be empty.</Form.Control.Feedback>

                                        </Form.Floating>
                                    </div>
                                    <div className="col-lg-6 px-4">
                                        <Form.Floating className="mb-3">
                                            <Form.Control required
                                            id="firstName"
                                            className="rounded rounded-5"
                                            type="text"
                                            placeholder="First Name"
                                            style={{ height: '70px' }}

                                            />
                                             <Form.Control.Feedback type="invalid">First name cannot be empty.</Form.Control.Feedback>

                                            <label className="labels" htmlFor="floatingInputCustom">First Name</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control required
                                            id="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}

                                            />
                                             <Form.Control.Feedback type="invalid">Last name cannot be empty.</Form.Control.Feedback>

                                            <label className="labels" htmlFor="floatingInputCustom">Last Name</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control 
                                            id="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}
                                            required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

                                            />
                                            <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <label className="labels" htmlFor="floatingInputCustom">Email Address</label>
                                        </Form.Floating>
                                        <Form.Floating className="mb-3">
                                            <Form.Control required
                                            id="contactNo"
                                            type="tel"
                                            className="rounded rounded-5"
                                            style={{ height: '70px' }}
                                            placeholder="Contact No. (e.g., +1234567890)"
                                            pattern="\+[0-9]{1,3}[0-9]{9,15}" 
                                            />
                                             <Form.Control.Feedback type="invalid">Please enter a valid phone number (e.g., 123-456-7890).</Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <label className="labels" htmlFor="floatingInputCustom">Contact No. (e.g., +1234567890)</label>
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