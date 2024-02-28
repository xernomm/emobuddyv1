import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../Auth/useAxiosPrivate";
import axios from "../../utils/axios";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import index from "../../index.module.scss";
import register from "../../style/Register.module.scss";
import profile from "./UserProfile.module.scss";
import classlist from "../Class-List/ClassList.module.scss";
import youthopiaImage1 from "../../img/XtraSchoolImg/user/parent_avatar.png";
import bonuslinkImg from "../../img/XtraSchoolImg/user/bonuslink.png";
import info from "../../img/XtraSchoolImg/user/info.png";
import moment from "moment";
import SimpleBar from "simplebar-react";
import ChangePassword from "./ChangePassword";
import UpdateName from "./UpdateName";
import UpdateBonusLink from "./UpdateBonusLink";
import UpdateEmail from "./UpdateEmail";
import "simplebar/src/simplebar.css";
import EditChild from "./EditChild";
import editChild from "./EditChild.module.scss";
import {
  Modal,
  Dropdown,
  Button,
  Accordion,
  Card,
  useAccordionButton,
  AccordionCollapse,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

let headerCounter = [];

function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const [children, setChildren] = useState([]);
  const [classes, setClasses] = useState([]);
  const namesPerRow = 2;
  const classPerRow = 2;

  const [next, setNext] = useState(namesPerRow);
  const [next2, setNext2] = useState(classPerRow);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [modalData, setModalData] = useState({});
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [childrenAge, setChildrenAge] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [childInfoStatus, setChildInfoStatus] = useState({});
  const [showHeader, setShowHeader] = useState([]);

  const CustomToggleChildren = ({ children, eventKey }) => {
    const [toggleAccordion, setToggleAccordion] = useState();
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
      setShowHeader((current) => [...current, eventKey]);
    });

    if (eventKey === toggleAccordion) {
      return (
        <React.Fragment>
          <button className={profile.editButton} onClick={decoratedOnClick}>
            {children}
          </button>
        </React.Fragment>
      );
    }
    if (eventKey !== toggleAccordion) {
      return (
        <React.Fragment>
          <button className={profile.editButton} onClick={decoratedOnClick}>
            {children}
          </button>
        </React.Fragment>
      );
    }
  };

  const CustomToggleChildrenComponent = ({ children, eventKey }) => {
    const [toggleAccordion, setToggleAccordion] = useState();
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      setToggleAccordion(eventKey === toggleAccordion ? null : eventKey);
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
            className={editChild.cancelButton}
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
            className={editChild.cancelButton}
            type="button"
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        </React.Fragment>
      );
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClose2 = () => {
    setShow2(false);
  };

  const handleClose3 = () => {
    setShow3(false);
  };
  const handleClose4 = () => {
    setShow4(false);
  };
  const handleClose5 = () => {
    setShow5(false);
  };

  const handleClose6 = () => {
    setShow6(false);
  };

  const handleMoreNames = () => {
    setNext(next + namesPerRow);
  };
  const handleMoreClass = () => {
    setNext2(next2 + classPerRow);
  };

  const confirmationWindow = (id) => {
    setModalData(id);
    setShow5(true);
  };

  const deleteChild = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/children/delete`, {
        data: {
          childId: id,
        },
      });
      setShow5(false);
      setShow4(true);
      setChildInfoStatus(response.data.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (err) {
      //console.error(err);
      setShow4(true);
      setChildInfoStatus("err");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    axios.get(`/classes`).then((response) => {
      setClasses(response.data);
    });

    const getChildren = async () => {
      try {
        const response = await axiosPrivate.get("/children", {
          signal: controller.signal,
        });
        isMounted && setChildren(response.data);
      } catch (err) {
        //console.error(err);
      }
    };

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user/profile", {
          signal: controller.signal,
        });
        isMounted && setUserProfile(response.data);
        console.log(response.data);
        const classesEnrolled = response.data.enrolled_classes;
        await axiosPrivate
          .post(`/classSchedule/enrolled`, {
            classesEnrolled: classesEnrolled,
          })
          .then((response) => {
            setScheduleDetails(response.data);
          })
          .catch((error) => {
            //console.log(error);
          });
      } catch (err) {
        //console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();
    getChildren();
    document.body.style.backgroundColor = "#E5E5E5";

    return () => {
      isMounted = false;
      document.body.style.backgroundColor = "white";

      //controller.abort(); commened due to causingg cancelled error
    };
  }, []);

  const calculateAge = (birthdate) => {
    var aDate = moment(birthdate, "YYYYMMDD", true);
    var invalidAt = aDate.invalidAt(); //returns 2 for invalid day
    return moment().diff(moment(birthdate, "YYYYMMDD"), "years");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img style={{ width: "100%" }} src={info}></img>

      {children}
    </a>
  ));

  const showBonusLink = () => {
    if (userProfile.bonuslink_card !== null) {
      return (
        <div className={profile.bonusLinkDiv}>
          <div className={profile.bonusLinkImageDiv}>
            <img src={bonuslinkImg} className={profile.bonusLinkImage}></img>
          </div>
          <div style={{ width: "70%" }}>
            <p className={profile.bonusLink}>{userProfile.bonuslink_card}</p>
          </div>
          <div style={{ width: "10%" }}>
            <FontAwesomeIcon
              onClick={() => {
                setShow6(true);
              }}
              icon={faPencil}
              style={{ color: "white", width: "100%", cursor: "pointer" }}
              size="sm"
            ></FontAwesomeIcon>
          </div>
        </div>
      );
    }

    if (userProfile.bonuslink_card === null) {
      return (
        <div className={profile.bonusLinkDiv}>
          <div className={profile.bonusLinkImageDiv}>
            <img src={bonuslinkImg} className={profile.bonusLinkImage}></img>
          </div>
          <div style={{ width: "70%" }}>
            <p className={profile.bonusLink}>Add BonusLink Card</p>
          </div>
          <div style={{ width: "10%" }}>
            <FontAwesomeIcon
              onClick={() => {
                setShow6(true);
              }}
              icon={faPlus}
              style={{ color: "white", width: "100%", cursor: "pointer" }}
              size="lg"
            ></FontAwesomeIcon>
          </div>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      {/*CONFIRMATION WINDOW*/}
      <Modal
        show={show5}
        onHide={handleClose5}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ paddingLeft: "0px" }}
      >
        <Modal.Body>
          <div
            className={index.flexContainerCol}
            style={{
              marginTop: "50px",
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "100%" }}>
              <p className={index.popupFont} style={{ fontSize: "25px" }}>
                Are you sure you want to delete this child?
              </p>
            </div>
            <div
              className={index.flexContainer}
              style={{ alignContent: "center", width: "100%" }}
            >
              <button
                className={register.btnPressed}
                style={{
                  width: "40%",
                  margin: "5px",
                  boxShadow: "1px 4px 3px rgb(204 199 199) ",
                }}
                onClick={() => {
                  deleteChild(modalData.id);
                }}
              >
                Yes
              </button>
              <button
                className={register.btnPressed}
                style={{
                  width: "40%",
                  margin: "5px",
                  border: "none",
                  color: "#ef8354",
                  backgroundColor: "transparent",
                }}
                onClick={handleClose5}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/*CHANGE PASSWORD*/}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ paddingLeft: "0px" }}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            border: "none",
            paddingBottom: "0",
          }}
        >
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "#ef8354" }}
              size="2x"
            ></FontAwesomeIcon>
          </Button>
        </Modal.Header>
        <ChangePassword />
      </Modal>

      {/*UPDATE NAME*/}
      <Modal
        show={show2}
        onHide={handleClose2}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ paddingLeft: "0px" }}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            border: "none",
            paddingBottom: "0",
          }}
        >
          <Button
            onClick={handleClose2}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "#ef8354" }}
              size="2x"
            ></FontAwesomeIcon>
          </Button>
        </Modal.Header>
        <UpdateName />
      </Modal>

      {/*UPDATE EMAIL*/}
      <Modal
        show={show3}
        onHide={handleClose3}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ paddingLeft: "0px" }}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            border: "none",
            paddingBottom: "0",
          }}
        >
          <Button
            onClick={handleClose3}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "#ef8354" }}
              size="2x"
            ></FontAwesomeIcon>
          </Button>
        </Modal.Header>
        <UpdateEmail />
      </Modal>

      {/*UPDATE BONUSLINK*/}
      <Modal
        show={show6}
        onHide={handleClose6}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ paddingLeft: "0px" }}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            border: "none",
            paddingBottom: "0",
          }}
        >
          <Button
            onClick={handleClose6}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <FontAwesomeIcon
              icon={faClose}
              style={{ color: "#ef8354" }}
              size="2x"
            ></FontAwesomeIcon>
          </Button>
        </Modal.Header>
        <UpdateBonusLink card={userProfile.bonuslink_card} />
      </Modal>

      {/*POPUP WINDOW*/}
      <Modal
        show={show4}
        onHide={handleClose4}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        style={{ paddingLeft: "0px" }}
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
          backgroundColor: "transparent",
          maxWidth: "1400px",
          marginBottom: "20px",
        }}
      >
        <div
          className={index.flexContainer}
          style={{ justifyContent: "space-between" }}
        >
          <div className={`${index.flexContainerCol} ${profile.userInfoDiv}`}>
            <div
              className={profile.cardUser}
              style={{
                maxWidth: "750px",
                marginRight: "auto",
                alignContent: "center",
              }}
            >
              <div
                className={index.flexContainerCol}
                style={{ marginRight: "20px", marginLeft: "20px" }}
              >
                <div className={profile.flexContainerUserInfo}>
                  <div className={profile.kidImgList}>
                    <img
                      style={{ width: "100%", borderRadius: "50%" }}
                      src={youthopiaImage1}
                    ></img>
                  </div>
                  <div
                    className={index.flexContainerCol}
                    style={{ width: "70%" }}
                  >
                    <div>
                      <p className={profile.userInfo}>Hello!</p>
                    </div>
                    <div>
                      <p className={profile.userInfo}>{userProfile.email}</p>
                    </div>
                  </div>
                  <div className={profile.info}>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu
                        className={profile.dropdownMenu}
                        style={{ margin: "0" }}
                      >
                        <Dropdown.Item
                          className={profile.dropdownItem}
                          eventKey="1"
                          onClick={() => {
                            setShow(true);
                          }}
                        >
                          Change Password
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={profile.dropdownItem}
                          eventKey="2"
                          onClick={() => {
                            setShow2(true);
                          }}
                        >
                          Edit Name
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={profile.dropdownItem}
                          eventKey="3"
                          onClick={() => {
                            setShow3(true);
                          }}
                        >
                          Update Email
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <p className={profile.userName}>{userProfile.username}</p>
                </div>
                {showBonusLink()}
              </div>
            </div>
            <div
              className={index.flexContainerCol}
              style={{
                maxWidth: "750px",
                marginRight: "auto",
                alignContent: "center",
                width: "100%",
                marginBottom: "30px",
              }}
            >
              <p className={profile.enrolledClass}>Your Superstars</p>
              {children.map((children, index) => {
                return (
                  <>
                    <div style={{ width: "100%" }}>
                      <Accordion>
                        <div className={profile.card3}>
                          <div
                            className={
                              showHeader.includes(index) === true
                                ? profile.flexContainerKidslistDisplayNone
                                : profile.flexContainerKidslist
                            }
                            style={{ justifyContent: "flex-start" }}
                          >
                            <div className={profile.kidNameDiv}>
                              <p className={profile.enrolCardTitlesList}>
                                {children.name}
                              </p>
                            </div>
                            <div className={profile.kidAgeDiv}>
                              <p className={profile.kidAge}>
                                Age {calculateAge(children.birthday)}
                              </p>
                            </div>
                            <div className={profile.deleteButtonDiv}>
                              <button
                                className={profile.deleteButton}
                                onClick={() => {
                                  confirmationWindow(children);
                                }}
                              >
                                delete
                              </button>
                            </div>
                            <div className={profile.editButtonDiv}>
                              <CustomToggleChildren eventKey={index}>
                                Edit
                              </CustomToggleChildren>
                            </div>
                          </div>
                          <AccordionCollapse eventKey={index}>
                            <>
                              <EditChild
                                data={children.id}
                                Toggle={CustomToggleChildrenComponent}
                                Index={index}
                              />
                            </>
                          </AccordionCollapse>
                        </div>
                      </Accordion>
                    </div>
                  </>
                );
              })}
              {children.length === 0 && (
                <div className={profile.card3}>
                  <div className={profile.flexContainerKidslist}>
                    <div style={{ width: "70%", marginLeft: "20px" }}>
                      <p className={profile.enrolCardTitlesList}>
                        Add your Superstar to sign up for classes!
                      </p>
                    </div>
                    <div style={{ width: "20%", alignSelf: "center" }}>
                      <Link to="/registerchild" className={profile.addKid}>
                        Add{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {children.length > 0 && (
                <Link to="/registerchild" className={profile.addChild}>
                  add another superstar ➜
                </Link>
              )}
            </div>
            <div
              className={index.flexContainerCol}
              style={{
                maxWidth: "750px",
                marginRight: "auto",
                alignContent: "center",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <p className={profile.enrolledClass}>Checkout Our Classes</p>
              <SimpleBar
                style={{ height: "780px", width: "100%" }}
                className={profile.scrollbar}
              >
                {classes.map((classes) => {
                  if (classes.is_active === true)
                    return (
                      <Link
                        to={`/classdetail/${classes.id}`}
                        style={{ marginBottom: "10px" }}
                        key={classes.id}
                      >
                        <div
                          className={`shadow ${classlist.card}`}
                          style={{
                            verticalAlign: "top",
                            cursor: "pointer",
                            marginBottom: "30px",
                          }}
                        >
                          <div
                            className={index.flexContainer}
                            style={{
                              height: "100%",
                              width: "100%",
                              justifyContent: "left",
                              margin: "0",
                              flexWrap: "nowrap",
                            }}
                          >
                            <div className={classlist.imageDiv}>
                              <img
                                className={classlist.classImg}
                                src={classes.image}
                                alt="img"
                              ></img>
                            </div>
                            <div
                              className={`${classlist.cardBody} , ${index.flexContainerCol}`}
                              style={{
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <p
                                  className="card-text"
                                  style={{
                                    fontFamily: "SourceSansPro-Regular",
                                    color: "#3D9795",
                                  }}
                                >
                                  Ages {classes.lower_age_range} -{" "}
                                  {classes.upper_age_range}
                                </p>
                                <p
                                  className="card-text"
                                  style={{
                                    fontFamily: "SourceSansPro-SemiBold",
                                    fontSize: "24px",
                                    color: "#5D5FEF",
                                  }}
                                >
                                  {classes.title}
                                </p>
                                <div style={{ alignSelf: "flex-start" }}>
                                  <p
                                    className={classlist.descriptionText}
                                    style={{
                                      fontFamily: "SourceSansPro-Black",
                                      color: "#B2B2B2",
                                    }}
                                  >
                                    {classes.description}
                                  </p>
                                  <p
                                    className="card-text"
                                    style={{
                                      fontFamily: "SourceSansPro-Black",
                                      color: "#B2B2B2",
                                    }}
                                  >
                                    Taught by: {classes.teacher_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={index.flexContainerBetween}
                                style={{
                                  alignItems: "flex-end",
                                  paddingTop: "20px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <div className={index.flexContainerCol}>
                                  {/*
                                  <p
                                    style={{
                                      fontFamily: "Quicksand-VariableFont_wght",
                                      color: "steelblue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Meets 24 times • Over 24 Weeks
                                  </p>
                                  <p
                                    style={{
                                      fontFamily: "Quicksand-VariableFont_wght",
                                      color: "steelblue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Sat, 04 Jun, 10:30-12:30, +23 more times
                                  </p>
                                  */}
                                </div>
                                <div>
                                  <p>
                                    <span
                                      className={profile.classPrice}
                                      style={{
                                        fontSize: "20px",
                                        color: "#3D9795",
                                      }}
                                    >
                                      RM {classes.price}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "SourceSansPro-Regular",
                                        color: "#3D9795",
                                      }}
                                    >
                                      &nbsp;per class
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                })}
              </SimpleBar>
            </div>
          </div>
          <div
            className={`${index.flexContainerCol} ${profile.enrolledClassDiv}`}
            style={{ alignSelf: "flex-start" }}
          >
            <div>
              <p className={profile.enrolledClass}>Enrolled Classes</p>
            </div>
            <div className={index.flexContainerCol}>
              {scheduleDetails.slice(0, next2).map((enrolled) => {
                return (
                  <>
                    <div className={profile.cardEnrol}>
                      <div
                        className={index.flexContainer}
                        style={{ flexDirection: "row" }}
                      >
                        <div
                          className={index.flexContainerCol}
                          style={{ width: "70%" }}
                        >
                          <div>
                            <p className={profile.enrolTitle}>
                              {enrolled.class_title}
                            </p>
                          </div>
                          <div>
                            <div>
                              {enrolled.date_range_upper === null && (
                                <p className={profile.enrolDesc}>
                                  {enrolled.day_lower}
                                </p>
                              )}
                              {enrolled.date_range_upper !== null && (
                                <p className={profile.enrolDesc}>
                                  {enrolled.day_lower} - {enrolled.day_upper}
                                </p>
                              )}
                            </div>
                            <div>
                              {" "}
                              <p className={profile.enrolDesc}>
                                {enrolled.time_lower_12hour} -{" "}
                                {enrolled.time_upper_12hour}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={index.flexContainerCol}
                          style={{ width: "20%", alignSelf: "flex-start" }}
                        >
                          {children
                            .filter(
                              (enrolledChild) =>
                                enrolledChild.enrolled_classes.includes(
                                  enrolled.id
                                ) === true
                            )
                            .slice(0, next)
                            .map((child) => {
                              return (
                                <div className={profile.cardKidEnrol}>
                                  <p className={profile.cardKidEnrolText}>
                                    {child.name}
                                  </p>
                                </div>
                              );
                            })}
                          {next < children.length && (
                            <button
                              className={`${profile.cardKidEnrol} ${profile.cardKidEnrolText}`}
                              onClick={handleMoreNames}
                            >
                              + more
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              {scheduleDetails.length === 0 && (
                <div className={profile.cardEnrol}>
                  <div
                    className={index.flexContainer}
                    style={{ flexDirection: "row" }}
                  >
                    <div
                      className={index.flexContainerCol}
                      style={{ width: "70%" }}
                    >
                      <div>
                        <p className={profile.enrolTitle}>
                          You haven’t enrolled in any classes yet :(
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {next2 < scheduleDetails.length && (
                <button
                  className={classlist.btnPressed}
                  style={{ width: "150px", alignSelf: "center" }}
                  onClick={handleMoreClass}
                >
                  Load more
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserProfile;
