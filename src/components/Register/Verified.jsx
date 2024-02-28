import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import register from "../../style/Register.module.scss";
import index from "../../index.module.scss";
import svg from "../../img/XtraSchoolImg/register/title.png";
import svg2 from "../../img/XtraSchoolImg/register/footer2x.png";
import axios from "../../utils/axios";
import useAuth from "../Auth/useAuth";
import { Modal } from "react-bootstrap";
import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";

function Verified() {
  const { auth, setAuth } = useAuth();
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

  const login = async (userInfo) => {
    try {
      const response = await axios.post("/user/login", userInfo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data.error) {
        setShow(true);
        setUserInfoErr(response.data.error);
        //console.log(response.data.error);
      } else {
        //console.log(response?.data);
        const accessToken = response?.data?.accessToken;
        setAuth({ userInfo, accessToken });
        navigate("/registerchild");
      }
    } catch (err) {
      //console.log(err);
    }
  };
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
              <p className={register.mainTitles}>Congratulations!</p>
              <p className={register.spanText} style={{ paddingRight: "5px" }}>
                You have verified your account <br></br>
              </p>
              <p className={register.spanText} style={{ paddingRight: "5px" }}>
                Please login to continue with your child registration <br></br>
              </p>
              <div className="container" style={{ maxWidth: "800px" }}>
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
                            autoComplete="off"
                            name="password"
                            type="password"
                            formcontrolname="password"
                            className={register.formControl}
                          ></Field>
                        </div>
                        {/*SIGN IN BUTTON*/}
                        <button
                          className={register.btnPressed}
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Add Child
                        </button>
                        <div
                          className="container"
                          style={{
                            marginTop: "1rem",
                            fontFamily: "Raleway-VariableFont_wght",
                          }}
                        >
                          {" "}
                          <Link
                            to="/forgotpassword"
                            style={{ color: "#EF8354", fontSize: "15px" }}
                          >
                            Forgot Your Password?
                          </Link>
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

export default Verified;
