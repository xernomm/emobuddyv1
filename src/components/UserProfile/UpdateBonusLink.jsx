import React, { useEffect, useState } from "react";
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

import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";

function UpdateBonusLink({ card }) {
  const [show, setShow] = useState(false);

  const [step, setStep] = useState(0);
  const [userInfoErr, setUserInfoErr] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const initialValues = {
    newBonusLink: "",
  };

  const validationSchema = Yup.object().shape({
    newBonusLink: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numeric values")
      .min(16, "Card no. must be 16 digits")
      .max(16, "Card no. must be 16 digits"),
    //.required("New Bonuslink Card No. is a required field"),
  });

  const previousStep = () => {
    // Update state with incremented value
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.put(`/user/updatebonuslink`, data, {
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
        }, 2000);
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
              {card === null && (
                <p className={register.mainTitles}>
                  Add Your BonusLink Card No.
                </p>
              )}
              {card !== null && (
                <p className={register.mainTitles}>
                  Change Your BonusLink Card No.
                </p>
              )}
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
                    {/*NAME*/}

                    <div className="form-group">
                      {card !== null && (
                        <label className={register.labelTitle}>
                          New BonusLink Card No.
                        </label>
                      )}
                      {card === null && (
                        <label className={register.labelTitle}>
                          BonusLink Card No.
                        </label>
                      )}
                      <ErrorMessage
                        name="newBonusLink"
                        render={(msg) => (
                          <div className={register.invalidFeedback}>{msg}</div>
                        )}
                      ></ErrorMessage>

                      <Field
                        name="newBonusLink"
                        autoComplete="off"
                        type="text"
                        formcontrolname="newBonusLink"
                        id="newBonusLink"
                        placeholder="Enter BonusLink Card No."
                        className={register.formControl}
                      ></Field>
                    </div>

                    {/*SIGN IN BUTTON*/}
                    <button
                      className={register.btnPressed}
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Update BonusLink Card
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
    /*SUCCESSFUL CARD UPDATE*/
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
                Your BonusLink Card has been updated <br></br>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UpdateBonusLink;
