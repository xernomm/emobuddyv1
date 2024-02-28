import React, { useState, useRef } from "react";
import register from '../../style/Register.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import useAxiosPrivate from "../Auth/useAxiosPrivate";
import EditChildRegister from "./EditChildRegister";
import {
    Modal,
    Dropdown,
    Button,
    Accordion,
    useAccordionButton,
    AccordionCollapse,
  } from "react-bootstrap";
  import moment from "moment";
  import CheckBoxButtonComponent from "./CheckBoxComponent";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPencil, faClose } from "@fortawesome/free-solid-svg-icons";
  import youthopiaImage1 from "../../img/XtraSchoolImg/user/kid_avatar.png";


let childrenList = [];
let headerCounter = [];

function ChildRegister() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const formikRef = useRef();
    const [childrenListUpdated, setChildrenListUpdated] = useState([]);
    const [showHeader, setShowHeader] = useState([]);
    const [indexDelete, setIndexDelete] = useState(-1);
    const [counter, setCounter] = useState(0);
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
  
    const [step, setStep] = useState(0);
    const [show, setShow] = useState(false);
    const [childInfoStatus, setChildInfoStatus] = useState({});
    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
  
    const confirmationWindow = (index) => {
      setIndexDelete(index);
      setShow2(true);
    };
    const calculateAge = (birthdate) => {
      var aDate = moment(birthdate, "YYYYMMDD", true);
      var invalidAt = aDate.invalidAt(); //returns 2 for invalid day
      return moment().diff(moment(birthdate, "YYYYMMDD"), "years");
    };
  
    const initialValues = {
      name: "",
      gender: "",
      day: "",
      month: "",
      year: "",
      fun_fact: "",
      topics: [],
    };
  
    //EDIT BUTTON IMAGE
    const CustomToggleImage = ({ children, eventKey }) => {
      const [toggleAccordion, setToggleAccordion] = useState();
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
        setShowHeader((current) => [...current, eventKey]);
      });
  
      if (eventKey === toggleAccordion) {
        return (
          <React.Fragment>
            <FontAwesomeIcon
              className="editButtonMobile"
              onClick={decoratedOnClick}
              icon={faPencil}
              style={{ color: "#1494b3" }}
              size="sm"
            >
              {" "}
              {children}
            </FontAwesomeIcon>
          </React.Fragment>
        );
      }
      if (eventKey !== toggleAccordion) {
        return (
          <React.Fragment>
            <FontAwesomeIcon
              className="editButtonMobile"
              onClick={decoratedOnClick}
              icon={faPencil}
              style={{ color: "#1494b3" }}
              size="sm"
            >
              {" "}
              {children}
            </FontAwesomeIcon>
          </React.Fragment>
        );
      }
    };
  
    //EDIT BUTTON
    const CustomToggleChildren = ({ children, eventKey }) => {
      const [toggleAccordion, setToggleAccordion] = useState();
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
        setShowHeader((current) => [...current, eventKey]);
      });
  
      if (eventKey === toggleAccordion) {
        return (
          <React.Fragment>
            <button className="editButton" onClick={decoratedOnClick}>
              {children}
            </button>
          </React.Fragment>
        );
      }
      if (eventKey !== toggleAccordion) {
        return (
          <React.Fragment>
            <button className="editButton" onClick={decoratedOnClick}>
              {children}
            </button>
          </React.Fragment>
        );
      }
    };
  
    //CANCEL BUTTON
    const CustomToggleChildrenComponent = ({
      children,
      eventKey,
      handleReset,
    }) => {
      const [toggleAccordion, setToggleAccordion] = useState();
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
        handleReset();
        headerCounter = showHeader;
        const index = headerCounter.indexOf(eventKey);
        if (index > -1) {
          // only splice array when item is found
          headerCounter.splice(index, 1); // 2nd parameter means remove one item only
        }
        setShowHeader([...headerCounter]);
      });
  
      if (eventKey === toggleAccordion) {
        return (
          <React.Fragment>
            <button
              className="cancelButton"
              type="button"
              onClick={decoratedOnClick}
            >
              {children}
            </button>
          </React.Fragment>
        );
      }
      if (eventKey !== toggleAccordion) {
        return (
          <React.Fragment>
            <button
              className="cancelButton"
              type="button"
              onClick={decoratedOnClick}
            >
              {children}
            </button>
          </React.Fragment>
        );
      }
    };
  
    //SAVE SUPERSTAR BUTTON
    const Submit = ({ children, eventKey, Valid, handleSubmit }) => {
      const [toggleAccordion, setToggleAccordion] = useState();
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
        handleSubmit();
        headerCounter = showHeader;
        const index = headerCounter.indexOf(eventKey);
        if (index > -1) {
          // only splice array when item is found
          headerCounter.splice(index, 1); // 2nd parameter means remove one item only
        }
        setShowHeader([...headerCounter]);
      });
      if (eventKey === toggleAccordion) {
        return (
          <React.Fragment>
            <button
              style={{
                alignSelf: "center",
                width: "90%",
              }}
              onClick={decoratedOnClick}
              disabled={Valid}
              className="btnPressed"
            >
              {children}{" "}
            </button>
          </React.Fragment>
        );
      }
      if (eventKey !== toggleAccordion) {
        return (
          <React.Fragment>
            <button
              style={{
                alignSelf: "center",
                width: "90%",
              }}
              onClick={decoratedOnClick}
              disabled={Valid}
              className="btnPressed"
            >
              {children}
            </button>
          </React.Fragment>
        );
      }
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
  
    const deleteChildFromList = (index) => {
      if (index > -1) {
        // only splice array when item is found
        childrenList = childrenListUpdated;
        childrenList.splice(index, 1); // 2nd parameter means remove one item only
      }
      setChildrenListUpdated([...childrenList]);
      setShow2(false);
    };
  
    const childAddtoList = async (childInfo) => {
      let childDOB = childInfo.year + "-" + childInfo.month + "-" + childInfo.day;
      const actualDOB = moment(childDOB).format("YYYY-MM-DD");
      setCounter(counter + 1);
  
      let childAdded = {
        counterId: counter,
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
        setStep(step + 1);
        setChildrenListUpdated((current) => [...current, childAdded]);
      }
    };
  
    const handleEdit = (data) => {
      setChildrenListUpdated((current) =>
        current.map((obj, index) => {
          if (index === data.id) {
            return {
              ...obj,
              name: data.name,
              gender: data.gender,
              day: data.day,
              month: data.month,
              year: data.year,
              birthday: data.birthday,
              fun_fact: data.fun_fact,
              topics: data.topics,
            };
          }
  
          return obj;
        })
      );
    };
  
    const previousStep = () => {
      // Update state with incremented value
      setStep(step - 1);
      setShowHeader([]);
    };
    /*
    const childregister = async (childInfo) => {
      try {
        let childDOB =
          childInfo.year + "-" + childInfo.month + "-" + childInfo.day;
        const actualDOB = moment(childDOB).format("YYYY-MM-DD");
        const response = await axiosPrivate.post(
          "/children",
          {
            name: childInfo.name,
            gender: childInfo.gender,
            birthday: actualDOB,
            fun_fact: childInfo.fun_fact,
            topics: childInfo.topics,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.error) {
          setShow(true);
          setChildInfoStatus(response.data.error);
          //console.log(response.data.error);
        } else if (!response.data.error) {
          //console.log(childDOB);
          setShow2(true);
          setChildInfoStatus(response.data.message);
        }
      } catch (err) {
        //console.log(err);
      }
    };
  */
  
    const childregister = async () => {
      try {
        const response = await axiosPrivate.post(
          "/children/create",
          childrenListUpdated,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.error) {
          setShow(true);
          setChildInfoStatus(response.data.error);
          //console.log(response.data.error);
        } else if (!response.data.error) {
          //console.log(childDOB);
          setShow(true);
          setChildInfoStatus(response.data.message);
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        }
      } catch (err) {
        //console.log(err);
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
                className="flexContainer"
                style={{
                  justifyContent: "left",
                  margin: "20px",
                  marginBottom: "0",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p className="popupFont">{childInfoStatus}</p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
  
          <div
            className="container"
            style={{
              paddingBottom: "40px",
              backgroundColor: "inherit",
              maxWidth: "1400px",
            }}
          >
            <div
              className={`shadow , textCenter`}
              style={{ backgroundColor: "#FFEDC1", paddingBottom: "0px" }}
            >
              <div style={{ alignSelf: "center", width: "100%" }}>
                <div
                  className="containerHeader"
                  style={{ backgroundColor: "#ff7b7b" }}
                >
                  <p className="enrolCardTitles">
                    Tell us about your kids!
                  </p>
                  <p
                    className="enrolCardTitles"
                    style={{
                      fontSize: "15px",
                      paddingBottom: "30px",
                      paddingRight: "50px",
                      paddingLeft: "50px",
                    }}
                  >
                    We'll recommend classes they'll love
                  </p>
                </div>
                <div className="containerFormEnrol">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={childAddtoList}
                    validationSchema={validationSchema}
                    innerRef={formikRef}
                    validateOnMount
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="form-group">
                            <div className="flexContainerCol">
                              <div
                                className="flexContainerNowrap"
                                style={{ width: "100%" }}
                              >
                                <div
                                  className="flexContainerForm"
                                >
                                  <div className="childPicture">
                                    <img
                                      className="kidImg"
                                      style={{
                                        borderRadius: "1px",
                                        borderColor: "black",
                                      }}
                                      src={youthopiaImage1}
                                    ></img>
                                  </div>
                                  <div className="formWidth">
                                    <div className="form-group">
                                      <label
                                        className="labelTitle"
                                      >
                                        *First Name:
                                      </label>
                                      <ErrorMessage
                                        name="name"
                                        render={(msg) => (
                                          <div
                                            className="invalidFeedback"
                                          >
                                            {msg}
                                          </div>
                                        )}
                                      ></ErrorMessage>
                                      <Field
                                        name="name"
                                        autoComplete="off"
                                        id="name"
                                        type="text"
                                        className="formControl"
                                        placeholder="Enter Name"
                                        formcontrolname="name"
                                      ></Field>
                                    </div>
  
                                    <div className="form-group">
                                      <label
                                        className="labelTitle"
                                      >
                                        *Gender:
                                      </label>
                                      <ErrorMessage
                                        name="gender"
                                        render={(msg) => (
                                          <div
                                            className="invalidFeedback"
                                          >
                                            {msg}
                                          </div>
                                        )}
                                      ></ErrorMessage>
                                      <Field
                                        as="select"
                                        name="gender"
                                        type="text"
                                        className="customSelect"
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
                                        className="labelTitle"
                                      >
                                        *Birthday:
                                      </label>
                                      <div
                                        className="flexContainer"
                                        style={{ flexWrap: "nowrap" }}
                                      >
                                        <Field
                                          as="select"
                                          name="day"
                                          className="customSelect"
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
                                          className="customSelect"
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
                                          className="customSelect"
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
                                        className="labelTitle"
                                      >
                                        Fun Fact:
                                      </label>
                                      <Field
                                        name="fun_fact"
                                        type="name"
                                        className="formControl"
                                        id="fun_fact"
                                        placeholder=" eg. I love dinosaurs!"
                                        formcontrolname="fun_fact"
                                        autoComplete="off"
                                      ></Field>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="flexContainerColForm"
                                >
                                  <div className="tags">
                                    <p
                                      className="mainTitlesTags"
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "left",
                                        padding: "10px",
                                      }}
                                    >
                                      Favourite topics:
                                    </p>
                                    <div
                                      className="flexContainer"
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
                                                        id={`${tag}_${index}`}
                                                        name={tag}
                                                        label={tag}
                                                        arrayHelpers={
                                                          arrayHelpers
                                                        }
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
                                className="flexContainer"
                                style={{
                                  width: "100%",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div style={{ width: "40%" }}>
                                  <button
                                    disabled={!formik.isValid}
                                    type="submit"
                                    className="btnPressed"
                                  >
                                    Save Learner
                                  </button>
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
  
    if (step === 1) {
      return (
        <React.Fragment>
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <Modal.Body>
              <div
                className="flexContainer"
                style={{
                  justifyContent: "left",
                  margin: "20px",
                  marginBottom: "0",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p className="popupFont">{childInfoStatus}</p>
                </div>
                <div style={{ width: "100%" }}>
                  <p className="popupFont">
                    Directing you to your profile page
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
  
          {/*CONFIRMATION WINDOW*/}
  
          <Modal
            show={show2}
            onHide={handleClose2}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div
                className="flexContainerCol"
                style={{
                  marginTop: "50px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <p className="popupFont" style={{ fontSize: "25px" }}>
                    Are you sure you want to delete this child?
                  </p>
                </div>
                <div
                  className="flexContainer"
                  style={{ alignContent: "center", width: "100%" }}
                >
                  <button
                    className="btnPressed"
                    style={{
                      width: "40%",
                      margin: "5px",
                      boxShadow: "1px 4px 3px rgb(204 199 199) ",
                    }}
                    onClick={() => {
                      deleteChildFromList(indexDelete);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="btnPressed"
                    style={{
                      width: "40%",
                      margin: "5px",
                      border: "none",
                      color: "#ef8354",
                      backgroundColor: "transparent",
                    }}
                    onClick={handleClose2}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div
            className="container"
            style={{
              paddingBottom: "40px",
              backgroundColor: "inherit",
              maxWidth: "1400px",
            }}
          >
            <div
              className={`shadow , textCenter`}
              style={{ backgroundColor: "transparent", paddingBottom: "0px" }}
            >
              <div style={{ alignSelf: "center", width: "100%" }}>
                <div
                  className="containerHeader"
                  style={{ backgroundColor: "#ff7b7b" }}
                >
                  <p className="enrolCardTitles">
                    Tell us about your kids!
                  </p>
                  <p
                    className="enrolCardTitles"
                    style={{
                      fontSize: "15px",
                      paddingBottom: "30px",
                      paddingRight: "50px",
                      paddingLeft: "50px",
                    }}
                  >
                    We'll recommend classes they'll love
                  </p>
                </div>
                <>
                  <div className="containerFormEnrol">
                    {childrenListUpdated.map((childlist, index) => {
                      return (
                        <Accordion>
                          <div
                            className="containerFormEnrol"
                            key={childlist.counterId}
                          >
                            <div
                              className={
                                showHeader.includes(index) === true
                                  ? "flexContainerKidslistDisplayNone"
                                  : "flexContainerKidslist"
                              }
                            >
                              <div className="kidImageList">
                                <img
                                alt="kid-ytp"
                                  className="kidImg"
                                  style={{
                                    borderRadius: "1px",
                                    borderColor: "black",
                                  }}
                                  src={youthopiaImage1}
                                ></img>
                              </div>
                              <div className="kidNameList">
                                <p className="enrolCardTitlesList">
                                  {childlist.name}
                                </p>
                              </div>
                              <div className="kidAgeDiv">
                                <p className="kidAge">
                                  Age {calculateAge(childlist.birthday)}
                                </p>
                              </div>
                              <div className="deleteButtonDiv">
                                <button
                                  className="deleteButton"
                                  onClick={() => {
                                    confirmationWindow(index);
                                  }}
                                >
                                  delete
                                </button>
  
                                <FontAwesomeIcon
                                  className="deleteButtonMobile"
                                  onClick={() => {
                                    confirmationWindow(index);
                                  }}
                                  icon={faClose}
                                  style={{ color: "#b53448" }}
                                  size="xl"
                                ></FontAwesomeIcon>
                              </div>
                              <div className="editButtonDiv">
                                <CustomToggleChildren eventKey={index}>
                                  Edit
                                </CustomToggleChildren>
  
                                <CustomToggleImage
                                  eventKey={index}
                                ></CustomToggleImage>
                              </div>
                            </div>
                            <AccordionCollapse eventKey={index}>
                              <>
                                <EditChildRegister
                                  data={index}
                                  handleEdit={handleEdit}
                                  childlist={childlist}
                                  Toggle={CustomToggleChildrenComponent}
                                  Submit={Submit}
                                />
                              </>
                            </AccordionCollapse>
                          </div>
                        </Accordion>
                      );
                    })}
                    <div className="addChildDiv">
                      <button
                        onClick={previousStep}
                        className="addChild"
                      >
                        +Add another superstar
                      </button>
                    </div>
                  </div>
                </>
  
                <div className="containerFooter">
                  <div
                    className={register.formCheck}
                    style={{
                      paddingTop: "20px",
                      marginLeft: "3rem",
                      marginRight: "3rem",
                    }}
                  ></div>
                  <button
                    className={register.btnPressed2}
                    onClick={childregister}
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  
  export default ChildRegister;
  