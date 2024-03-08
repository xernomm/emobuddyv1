import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import svg from "../../img/XtraSchoolImg/register/title.png";
import svg2 from "../../img/XtraSchoolImg/register/footer2x.png";
import axios from "../../utils/axios";
import { Modal } from "react-bootstrap";
import useAuth from "../../components/Auth/useAuth";
import Swal from "sweetalert2";

export function LoginForm()
{
  const baseUrl = process.env.REACT_APP_BASE_URL
  const protocol = window.location.protocol;

  const loginUrl = `${protocol}//${baseUrl}/login`;


  const {auth, setAuth} = useAuth();
  const [show, setShow] = useState(false);
  const [userInfoErr, setUserInfoErr] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const initialValues = {
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is a required field"),
    email: Yup.string()
      .email("Please enter a valid Email")
      .required("Email is a required field"),
  });

  const login = async (initialValues, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(loginUrl, initialValues);
      sessionStorage.setItem('userEmail', initialValues.email);
      if (response.data.error) {
        const msg = response.data.error.msg
        setShow(true);
        setUserInfoErr(response.data.error);
        console.log(response.data.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: msg,
          footer: '<a href="/contact-us">Why do I have this issue?</a>'
        });
      } else {
        const accessToken = response.data.accessToken;
        console.log(response?.data);
        setAuth({ initialValues, accessToken });
        Swal.fire({
          icon: "success",
          title: "Logged in!",
          confirmButtonText: "Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        }); 
      }
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="/contact-us">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <>
    <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            className="loginModal"
            style={{
              justifyContent: "left",
              margin: "20px",
              marginBottom: "0",
            }}
          >
            <div style={{ width: "100%" }}>
              <p className="interBlue px16">{userInfoErr}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container col-lg-12 "
      style={{ backgroundColor: "inherit", maxWidth: "1400px" }}
        >
        <div className="loginBg shadow text-center"
          style={{
          backgroundColor: "transparent",
          marginTop: "100px",
          marginBottom: "100px",
          paddingBottom: "0px",
          }}>
        <div style={{ alignSelf: "center", width: "100%" }}>
            <div
              style={{
                backgroundColor: "#F2C857",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <p className="registerTitle">XtraSchool</p>
            </div>
            <div className="regisImgTopDiv">
              <img className="registerImg" src={svg}></img>
            </div>
            <div className="container">
              <p className="registerMainTitle">Login</p>
            </div>

            <div className="regisContainerForm">
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={login}
                  validateOnMount
                >
                  {(formik) => {
                    return (
                      <Form>
                        {/*EMAIL*/}

                        <div className="form-group">
                          <label className="labelTitle">Email</label>
                          <ErrorMessage
                            name="email"
                            render={(msg) => (
                              <div className="regisInvalidFeedback">
                                {msg}
                              </div>
                            )}
                          ></ErrorMessage>
                          <Field
                            autoComplete="off"
                            name="email"
                            type="email"
                            formcontrolname="email"
                            className="formControl"
                          ></Field>
                        </div>

                        {/*PASSWORD*/}
                        <div className="form-group">
                          <label className="labelTitle">
                            Password
                          </label>
                          <ErrorMessage
                            name="password"
                            render={(msg) => (
                              <div className="regisInvalidFeedback">
                                {msg}
                              </div>
                            )}
                          ></ErrorMessage>
                          <Field
                            autoComplete="off"
                            name="password"
                            type="password"
                            formcontrolname="password"
                            className="formControl"
                          ></Field>
                          <div
                            className="container mt-3"
                            style={{
                              fontFamily: "Archivo",
                              textAlign: "end",
                            }}
                          >
                            <Link
                              to="/forgotpassword"
                              style={{ color: "#EF8354", fontSize: "15px" }}
                            >
                              Forgot Your Password?
                            </Link>
                          </div>
                        </div>

                        {/*SIGN IN BUTTON*/}
                        <button
                          className="btnPressed"
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Sign in
                        </button>
                        <div
                          className="container"
                          style={{
                            marginTop: "1rem",
                            fontFamily: "Raleway-VariableFont_wght",
                          }}
                        >
                          <span
                            className="registerSpanText"
                            style={{ paddingRight: "5px" }}
                          >
                            Don't have an XtraSchool account?
                          </span>
                          <span className="registerSpanText">
                            <Link
                              to="/register"
                              style={{ color: "#EF8354", fontWeight: "bold" }}
                            >
                              Sign Up
                            </Link>
                          </span>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <div>
              <div className="registerSvgImageBottomDiv">
                <img className="registerImg" src={svg2}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}