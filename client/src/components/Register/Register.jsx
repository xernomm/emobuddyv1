import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import register from "../../style/Register.module.scss";
import index from "../../index.module.scss";
import svg from "../../img/XtraSchoolImg/register/title.png";
import svg2 from "../../img/XtraSchoolImg/register/footer2x.png";
import axios from "../../utils/axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
// import User from '../../../../server/model/User'
import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";

function Register() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const protocol = window.location.protocol;

  const registerUrl = `${protocol}//${baseUrl}/register`;

  const [show, setShow] = useState(false);

  const [step, setStep] = useState(0);
  const [userInfoErr, setUserInfoErr] = useState({});
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
    bonusLink: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is a required field"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password cannot exceed 15 characters")
      .required("Password is a required field"),
    email: Yup.string()
      .email("Please enter a valid Email")
      .required("Email is a required field"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is a required field"),

    bonusLink: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numeric values")
      .min(16, "Card no. must be 16 digits")
      .max(16, "Card no. must be 16 digits"),
  });

  const onSubmit = async (initialValues, { setSubmitting, resetForm }) => {
    try {
      // Send the form data to the backend
      const response = await axios.post(registerUrl, initialValues);
      sessionStorage.setItem('userEmail', initialValues.email);
  
      if (response.data.errors) {
        // Handle validation errors
        const errorMessage = response.data.errors[0].msg;
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: errorMessage,
        });
      } else if (response.data.error) {
        // Handle other errors
        const errorMessage = response.data.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          footer: '<a href="/contact-us">Why do I have this issue?</a>',
        });
      } else {
        resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Just one more step!',
          text: 'Thank you for joining us! Check your email for verification steps',
          showCancelButton: true,
          confirmButtonText: 'Next',
          cancelButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/verify-email';
          }
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="/contact-us">Why do I have this issue?</a>',
      });
    } finally {
      setSubmitting(false);
    }
  };
  

  if (step === 0) {
    return (
      <React.Fragment>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div
              className={index.flexContainer}
              style={{
                justifyContent: "left",
                margin: "20px",
                marginBottom: "0",
              }}
            >
              <div style={{ width: "100%" }}>
                <p className={index.popupFont}>{userInfoErr}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div
          className="container"
          style={{ backgroundColor: "inherit", maxWidth: "1400px" }}
        >
          <div
            className={`shadow ${index.textCenter}`}
            style={{
              backgroundColor: "transparent",
              marginTop: "100px",
              marginBottom: "100px",
              paddingBottom: "0px",
              borderRadius: "15px",
            }}
          >
            <div style={{ alignSelf: "center", width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#F2C857",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <p className={register.registerCardTitles}>XtraSchool</p>
              </div>
              <div className={register.svgImageTopDiv}>
                <img className={register.svgImage} src={svg}></img>
              </div>
              <div className="container">
                <p className={register.mainTitles}>Create an Account</p>
                <span
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  Already have an account?
                </span>
                <span className={register.spanText}>
                  <Link
                    to="/login"
                    style={{ color: "#EF8354", fontWeight: "bold" }}
                  >
                    Sign in
                  </Link>
                </span>
              </div>

              <div className={register.containerForm}>
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnMount
                  >
                    {(formik) => {
                      return (
                        <Form>
                          {/*ADULT EMAIL*/}

                          <div className="form-group">
                            <label className={register.labelTitle}>
                              Adult Email
                            </label>
                            <ErrorMessage
                              name="email"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              name="email"
                              autoComplete="off"
                              type="email"
                              formcontrolname="email"
                              id="email"
                              placeholder="Enter email"
                              className={register.formControl}
                            ></Field>
                          </div>
                          {/*NAME*/}

                          <div className="form-group">
                            <label className={register.labelTitle}>
                              Adult Full Name
                            </label>
                            <ErrorMessage
                              name="username"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>

                            <Field
                              name="username"
                              autoComplete="off"
                              type="text"
                              formcontrolname="username"
                              id="username"
                              placeholder="Enter Name"
                              className={register.formControl}
                            ></Field>
                          </div>

                          {/*BONUSLINK*/}
                          <div className="form-group">
                            <label className={register.labelTitle}>
                              BonusLink Card No.
                            </label>
                            <ErrorMessage
                              name="bonusLink"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              name="bonusLink"
                              autoComplete="off"
                              type="text"
                              formcontrolname="bonusLink"
                              id="bonusLink"
                              placeholder="BonusLink Card No."
                              className={register.formControl}
                            ></Field>
                          </div>

                          {/*PASSWORD*/}
                          <div className="form-group">
                            <label className={register.labelTitle}>
                              Password
                            </label>
                            <ErrorMessage
                              name="password"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              name="password"
                              autoComplete="off"
                              type="password"
                              formcontrolname="password"
                              id="password"
                              placeholder="Password"
                              className={register.formControl}
                            ></Field>
                          </div>

                          {/*CONFIRM PASSWORD*/}
                          <div className="form-group">
                            <label className={register.labelTitle}>
                              Confirm Password
                            </label>
                            <ErrorMessage
                              name="confirmpassword"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              autoComplete="off"
                              name="confirmpassword"
                              type="password"
                              formcontrolname="confirmPassword"
                              id="confirmpassword"
                              placeholder="Confirm Password"
                              className={register.formControl}
                            ></Field>
                          </div>

                          {/*SIGN IN BUTTON*/}
                          <button
                            className={register.btnPressed}
                            type="submit"
                            disabled={!formik.isValid}
                          >
                            Register Now
                          </button>
                          <div
                            className="container"
                            style={{
                              marginTop: "1rem",
                              fontFamily: "Raleway-VariableFont_wght",
                            }}
                          >
                            <span
                              className={register.spanText}
                              style={{ paddingRight: "5px" }}
                            >
                              By joining, you agree to the
                            </span>
                            <span className={register.spanText}>
                              <a
                                style={{ color: "#2B9EBC", fontWeight: "bold" }}
                              >
                                Terms and Conditions
                              </a>
                            </span>
                            <span
                              className={register.spanText}
                              style={{
                                paddingRight: "5px",
                                paddingLeft: "5px",
                              }}
                            >
                              and
                            </span>
                            <span className={register.spanText}>
                              <a
                                style={{ color: "#2B9EBC", fontWeight: "bold" }}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
              <div>
                <div className={register.svgImageBottomDiv}>
                  <img className={register.svgImage} src={svg2}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  {
    /*EMAIL VERIFICATION*/
  }
  if (step === 1) {
    return (
      <React.Fragment>
        <div
          className="container"
          style={{ backgroundColor: "inherit", maxWidth: "1400px" }}
        >
          <div
            className={`shadow ${index.textCenter}`}
            style={{
              backgroundColor: "transparent",
              marginTop: "100px",
              marginBottom: "100px",
              paddingBottom: "0px",
            }}
          >
            <div style={{ alignSelf: "center", width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#F2C857",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <p className={register.registerCardTitles}>XtraSchool</p>
              </div>
              <div className={register.svgImageTopDiv}>
                <img className={register.svgImage} src={svg}></img>
              </div>
              <div className="container">
                <p className={register.mainTitles}>Verify your Account</p>
                <p
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  We have sent you an <br></br>
                  <b>Email Verification</b>
                </p>
                <p
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  Please check your email for a verification link
                </p>
              </div>

              <div>
                <div className={register.svgImageBottomDiv}>
                  <img className={register.svgImage} src={svg2}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
