import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import childregisterCSS from "../../style/ChildRegister.module.scss";
import register from "../../style/Register.module.scss";
import index from "../../index.module.scss";
import { Modal } from "react-bootstrap";
import CheckBoxButtonComponent from "./CheckBoxComponent";
import editChild from "../UserProfile/EditChild.module.scss";
import youthopiaImage1 from "../../img/XtraSchoolImg/user/kid_avatar.png";
import moment from "moment";

function EditChildRegister({ data, handleEdit, childlist, Toggle, Submit }) {
  const formikRef = useRef();

  const tags = [
    "Health and Wellness",
    "Emotions",
    "Creative Writing",
    "Study Skills",
    "Critical Thinking",
    "Writing",
    "Video Game Design",
    "Drawing",
    "App Development",
    "Scratch",
    "Animation",
    "Dance",
    "Coding",
  ];

  const [show, setShow] = useState(false);
  const [childInfoStatus, setChildInfoStatus] = useState({});
  const handleClose = () => setShow(false);

  const initialValues = {
    name: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    fun_fact: "",
    topics: [],
  };

  const loadedValues = {
    name: childlist.name,
    gender: childlist.gender,
    day: childlist.day,
    month: childlist.month,
    year: childlist.year,
    fun_fact: childlist.fun_fact,
    topics: childlist.topics,
  };

  const handleReset = () => {
    formikRef.current?.resetForm();
  };

  const handleSubmit = () => {
    formikRef.current?.submitForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    gender: Yup.string()
      .required("Please choose a gender")
      .oneOf(["Male", "Female"]),

    day: Yup.string().required("Please choose a day"),
    month: Yup.string().required("Please choose a month"),
    year: Yup.string().required("Please choose a year"),
  });

  const childEdit = async (childInfo) => {
    try {
      let childDOB =
        childInfo.year + "-" + childInfo.month + "-" + childInfo.day;
      const actualDOB = moment(childDOB).format("YYYY-MM-DD");

      let childAdded = {
        id: data,
        name: childInfo.name,
        gender: childInfo.gender,
        day: childInfo.day,
        month: childInfo.month,
        year: childInfo.year,
        birthday: actualDOB,
        fun_fact: childInfo.fun_fact,
        topics: childInfo.topics,
      };
      if (childAdded.birthday === "Invalid date") {
        setShow(true);
        setChildInfoStatus("Invalid date");
      }
      if (childAdded.birthday !== "Invalid date") {
        handleEdit(childAdded);
      }
    } catch (error) {
      console.log(error);
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
              <p className={index.popupFont}>{childInfoStatus}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div
        className="container"
        style={{
          backgroundColor: "inherit",
          maxWidth: "1400px",
          marginTop: "20px",
        }}
      >
        <div
          className={index.textCenter}
          style={{ backgroundColor: "transparent", paddingBottom: "0px" }}
        >
          <div style={{ alignSelf: "center", width: "100%" }}>
            <div
              className={childregisterCSS.containerFormEnrol}
              style={{ width: "100%" }}
            >
              <Formik
                initialValues={loadedValues}
                validationSchema={validationSchema}
                onSubmit={childEdit}
                innerRef={formikRef}
                validateOnMount
              >
                {(formik) => {
                  return (
                    <Form>
                      <div className="form-group">
                        <div className={index.flexContainerCol}>
                          <div
                            className={index.flexContainerNowrap}
                            style={{ width: "100%" }}
                          >
                            <div className={childregisterCSS.flexContainerForm}>
                              <div className={childregisterCSS.childPicture}>
                                <img
                                  className={childregisterCSS.kidImg}
                                  style={{
                                    borderRadius: "1px",
                                    borderColor: "black",
                                  }}
                                  src={youthopiaImage1}
                                ></img>
                              </div>
                              <div className={childregisterCSS.formWidth}>
                                <div className="form-group">
                                  <label
                                    className={childregisterCSS.labelTitle}
                                  >
                                    *First Name:
                                  </label>
                                  <ErrorMessage
                                    name="name"
                                    render={(msg) => (
                                      <div className={register.invalidFeedback}>
                                        {msg}
                                      </div>
                                    )}
                                  ></ErrorMessage>
                                  <Field
                                    name="name"
                                    autoComplete="off"
                                    id="name"
                                    type="text"
                                    className={childregisterCSS.formControl}
                                    placeholder="Enter Name"
                                    formcontrolname="name"
                                  ></Field>
                                </div>

                                <div className="form-group">
                                  <label
                                    className={childregisterCSS.labelTitle}
                                  >
                                    *Gender:
                                  </label>
                                  <ErrorMessage
                                    name="gender"
                                    render={(msg) => (
                                      <div className={register.invalidFeedback}>
                                        {msg}
                                      </div>
                                    )}
                                  ></ErrorMessage>
                                  <Field
                                    as="select"
                                    name="gender"
                                    type="text"
                                    className={childregisterCSS.customSelect}
                                    id="inlineFormCustomSelect"
                                    formcontrolname="gender"
                                  >
                                    <option value="" disabled>
                                      Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </Field>
                                </div>

                                <div className="form-group">
                                  <label
                                    className={childregisterCSS.labelTitle}
                                  >
                                    *Birthday:
                                  </label>
                                  <div
                                    className={index.flexContainer}
                                    style={{ flexWrap: "nowrap" }}
                                  >
                                    <Field
                                      as="select"
                                      name="day"
                                      className={childregisterCSS.customSelect}
                                      formcontrolname="day"
                                    >
                                      <option value="" disabled>
                                        Day
                                      </option>
                                      <option value="01">1</option>
                                      <option value="02">2</option>
                                      <option value="03">3</option>
                                      <option value="04">4</option>
                                      <option value="05">5</option>
                                      <option value="06">6</option>
                                      <option value="07">7</option>
                                      <option value="08">8</option>
                                      <option value="09">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                      <option value="13">13</option>
                                      <option value="14">14</option>
                                      <option value="15">15</option>
                                      <option value="16">16</option>
                                      <option value="17">17</option>
                                      <option value="18">18</option>
                                      <option value="19">19</option>
                                      <option value="20">20</option>
                                      <option value="21">21</option>
                                      <option value="22">22</option>
                                      <option value="23">23</option>
                                      <option value="24">24</option>
                                      <option value="25">25</option>
                                      <option value="26">26</option>
                                      <option value="27">27</option>
                                      <option value="28">28</option>
                                      <option value="29">29</option>
                                      <option value="30">30</option>
                                      <option value="31">31</option>
                                    </Field>
                                    <Field
                                      as="select"
                                      name="month"
                                      className={childregisterCSS.customSelect}
                                      formcontrolname="month"
                                    >
                                      <option value="" disabled>
                                        Month
                                      </option>
                                      <option value="01">January</option>
                                      <option value="02">February</option>
                                      <option value="03">March</option>
                                      <option value="04">April</option>
                                      <option value="05">May</option>
                                      <option value="06">June</option>
                                      <option value="07">July</option>
                                      <option value="08">August</option>
                                      <option value="09">September</option>
                                      <option value="10">October</option>
                                      <option value="11">November</option>
                                      <option value="12">December</option>
                                    </Field>
                                    <Field
                                      as="select"
                                      name="year"
                                      className={childregisterCSS.customSelect}
                                      formcontrolname="year"
                                    >
                                      <option value="" disabled>
                                        Year
                                      </option>
                                      <option value="2019">2019</option>
                                      <option value="2018">2018</option>
                                      <option value="2017">2017</option>
                                      <option value="2016">2016</option>
                                      <option value="2015">2015</option>
                                      <option value="2014">2014</option>
                                      <option value="2013">2013</option>
                                      <option value="2012">2012</option>
                                      <option value="2011">2011</option>
                                      <option value="2010">2010</option>
                                      <option value="2009">2009</option>
                                      <option value="2008">2008</option>
                                      <option value="2007">2007</option>
                                      <option value="2006">2006</option>
                                      <option value="2005">2005</option>
                                      <option value="2004">2004</option>
                                      <option value="2003">2003</option>
                                      <option value="2002">2002</option>
                                      <option value="2001">2001</option>
                                      <option value="2000">2000</option>
                                    </Field>
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label
                                    className={childregisterCSS.labelTitle}
                                  >
                                    Fun Fact:
                                  </label>
                                  <Field
                                    name="fun_fact"
                                    type="name"
                                    className={childregisterCSS.formControl}
                                    id="fun_fact"
                                    placeholder=" eg. I love dinosaurs!"
                                    formcontrolname="fun_fact"
                                    autoComplete="off"
                                  ></Field>
                                </div>
                              </div>
                            </div>
                            <div
                              className={childregisterCSS.flexContainerColForm}
                            >
                              <div className={childregisterCSS.tags}>
                                <p
                                  className={childregisterCSS.mainTitlesTags}
                                  style={{
                                    fontSize: "15px",
                                    textAlign: "left",
                                    padding: "10px",
                                  }}
                                >
                                  Favourite topics:
                                </p>
                                <div
                                  className={index.flexContainer}
                                  style={{
                                    width: "100%",
                                    marginTop: "0",
                                    marginBottom: "0",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <FieldArray name="topics">
                                    {(arrayHelpers) => (
                                      <>
                                        {tags.map((tag, index) => {
                                          return (
                                            <Field
                                              key={`${tag}_${index}`}
                                              name={tag}
                                            >
                                              {({ field }) => {
                                                return (
                                                  <CheckBoxButtonComponent
                                                    {...field}
                                                    id={`${tag}_${index}_${data}`}
                                                    name={tag}
                                                    label={tag}
                                                    arrayHelpers={arrayHelpers}
                                                  />
                                                );
                                              }}
                                            </Field>
                                          );
                                        })}
                                      </>
                                    )}
                                  </FieldArray>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={index.flexContainer}
                            style={{
                              width: "100%",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div
                              className={`${index.flexContainer} ${editChild.flexButtonsDivRegister}`}
                              style={{ flexDirection: "row" }}
                            >
                              <div className={editChild.cancelChildDiv}>
                                <Toggle
                                  eventKey={data}
                                  style={{
                                    alignSelf: "center",
                                    width: "100%",
                                  }}
                                  handleReset={handleReset}
                                  className={editChild.cancelButton}
                                >
                                  cancel
                                </Toggle>
                              </div>
                              <div className={editChild.saveChildDiv}>
                                <Submit
                                  eventKey={data}
                                  Valid={!formik.isValid}
                                  handleSubmit={handleSubmit}
                                >
                                  Save Superstar
                                </Submit>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditChildRegister;
