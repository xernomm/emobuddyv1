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

function ResetPassword() {
  let { id } = useParams();
  const [show, setShow] = useState(false);

  const [step, setStep] = useState(0);
  const [userInfoErr, setUserInfoErr] = useState({});
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const initialValues = {
    newPass: "",

    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    newPass: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password cannot exceed 15 characters")
      .required("Password is a required field"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("newPass"), null], "Passwords must match")
      .required("Password Confirmation is a required field"),
  });

  const previousStep = () => {
    // Update state with incremented value
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`/user/resetpassword/${id}`, data, {
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
      setShow(true);
      setUserInfoErr("You are unauthorized");
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
                <p className={register.mainTitles}>Reset Your Password</p>
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
                          {/*PASSWORD*/}
                          <div className="form-group">
                            <label className={register.labelTitle}>
                              Password
                            </label>
                            <ErrorMessage
                              name="newPass"
                              render={(msg) => (
                                <div className={register.invalidFeedback}>
                                  {msg}
                                </div>
                              )}
                            ></ErrorMessage>
                            <Field
                              name="newPass"
                              autoComplete="off"
                              type="password"
                              formcontrolname="newPass"
                              id="newPass"
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
                            Reset Password
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
                <p className={register.mainTitles}>Congratulations</p>
                <p
                  className={register.spanText}
                  style={{ paddingRight: "5px" }}
                >
                  Your password has been changed <br></br>
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
export default ResetPassword;
