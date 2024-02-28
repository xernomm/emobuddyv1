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
import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";

function Register() {
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
    bonuslink: "",
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

    bonuslink: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numeric values")
      .min(16, "Card no. must be 16 digits")
      .max(16, "Card no. must be 16 digits"),
  });

  const nextStep = () => {
    // Update state with incremented value
    setStep(step + 1);
  };

  const previousStep = () => {
    // Update state with incremented value
    setStep(step - 1);
  };
  /*
  const onSubmit = async (data) => {
    await axios.post("/user", data).then((response) => {
      if (response.data.error) {
        setShow(true);
        setUserInfoErr(response.data.error);
      } else {
        step + 1;
      }
    });
  };*/
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/user/", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.error) {
        setShow(true);
        setUserInfoErr(response.data.error);
        //console.log(response.data.error);
      } else {
        setStep(step + 1);
      }
    } catch (err) {
      //console.log(err);
    }
  };
  {
    /*EMAIL SIGN UP*/
  }

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
                              name="bonuslink"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              name="bonuslink"
                              autoComplete="off"
                              type="text"
                              formcontrolname="bonuslink"
                              id="bonuslink"
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
