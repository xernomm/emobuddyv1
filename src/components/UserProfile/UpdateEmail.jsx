import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import register from "../../style/Register.module.scss";
import index from "../../index.module.scss";
import svg from "../../img/XtraSchoolImg/register/title.png";
import svg2 from "../../img/XtraSchoolImg/register/footer2x.png";
import axios from "../../utils/axios";
import useAxiosPrivate from "../Auth/useAxiosPrivate";
import { Modal } from "react-bootstrap";

import youthopiaImage1 from "../../assets/img/home/youthopian.png";

function UpdateEmail() {
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [step, setStep] = useState(0);
  const [userInfoErr, setUserInfoErr] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    email: "",

    confirmpassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid Email")
      .required("Email is a required field"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password cannot exceed 15 characters")
      .required("Password is a required field"),

    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is a required field"),
  });

  const previousStep = () => {
    // Update state with incremented value
    setStep(step - 1);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/profile");
        setUserProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.put(`/user/updateemail`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.error) {
        setShow(true);
        setUserInfoErr(response.data.error);
        //console.log(response.data.error);
      } else {
        //console.log(response?.data.message);
        setStep(step + 1);
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      }
    } catch (err) {
      //console.log(err);
      setShow(true);
      setUserInfoErr(err.response.data.error);
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
          className={index.textCenter}
          style={{
            backgroundColor: "transparent",
            paddingBottom: "0px",
            borderRadius: "15px",
            marginLeft: "50px",
            marginRight: "50px",
            marginBottom: "20px",
          }}
        >
          <div style={{ alignSelf: "center", width: "100%" }}>
            <div className="container">
              <p className={register.mainTitles}>Change Your Email</p>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    {/*CURRENT EMAIL*/}

                    <div className="form-group">
                      <label className={register.labelTitle}>
                        Current Email
                      </label>
                      <div
                        className={register.formControl}
                        style={{ textAlign: "left" }}
                      >
                        {userProfile.email}
                      </div>
                    </div>
                    {/*NEW EMAIL*/}

                    <div className="form-group">
                      <label className={register.labelTitle}>New Email</label>
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className={register.invalidFeedback}>{msg}</div>
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

                    {/*PASSWORD*/}
                    <div className="form-group">
                      <label className={register.labelTitle}>Password</label>
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <div className={register.invalidFeedback}>{msg}</div>
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
                          <div className={register.invalidFeedback}>{msg}</div>
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
                      Update Email
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
          className={index.textCenter}
          style={{
            backgroundColor: "transparent",
            paddingBottom: "0px",
            borderRadius: "15px",
            marginLeft: "50px",
            marginRight: "50px",
            marginBottom: "20px",
          }}
        >
          <div style={{ alignSelf: "center", width: "100%" }}>
            <div className="container">
              <p className={register.mainTitles}>Congratulations</p>
              <p className={register.spanText} style={{ paddingRight: "5px" }}>
                Your email has been changed. Please re-login with your new email
                <br></br>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UpdateEmail;
