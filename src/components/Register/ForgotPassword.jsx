import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import register from "../../style/Register.module.scss";
import index from "../../index.module.scss";
import svg from "../../img/XtraSchoolImg/register/title.png";
import svg2 from "../../img/XtraSchoolImg/register/footer2x.png";
import axios from "../../utils/axios";
import { Modal } from "react-bootstrap";

import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";

function ForgotPassword() {
  let { id } = useParams();
  const [show, setShow] = useState(false);

  const [step, setStep] = useState(0);
  const [userInfoErr, setUserInfoErr] = useState({});
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid Email")
      .required("Email is a required field"),
  });

  const previousStep = () => {
    // Update state with incremented value
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put("/user/forgotpassword", data, {
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
                <p className={register.mainTitles}>Password Reset Link</p>
                <p
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  Please fill in the email your registered with to receive
                  password reset link <br></br>
                </p>
              </div>

              <div className={register.containerForm}>
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnMount
                  >
                    {(formik) => {
                      return (
                        <Form>
                          {/*EMAIL*/}

                          <div className="form-group">
                            <label className={register.labelTitle}>Email</label>
                            <ErrorMessage
                              name="email"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              autoComplete="off"
                              name="email"
                              type="email"
                              formcontrolname="email"
                              className={register.formControl}
                            ></Field>
                          </div>

                          {/*SIGN IN BUTTON*/}
                          <button
                            className={register.btnPressed}
                            type="submit"
                            disabled={!formik.isValid}
                          >
                            Sent Reset Link
                          </button>
                          <div
                            className="container"
                            style={{
                              marginTop: "1rem",
                              fontFamily: "Raleway-VariableFont_wght",
                            }}
                          ></div>
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
    /*SUCCESSFUL PASSWORD RESET*/
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
                <p className={register.mainTitles}>Password Reset Link Sent</p>
                <p
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  Please check your email for a password reset link <br></br>
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
export default ForgotPassword;
