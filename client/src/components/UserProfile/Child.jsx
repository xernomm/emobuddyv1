import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../Auth/useAxiosPrivate";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import index from "../../index.module.scss";
import profile from "./UserProfile.module.scss";
import youthopiaImage1 from "../../img/XtraSchoolImg/home/youthopian.png";
import youthopiaKidImage1 from "../../img/XtraSchoolImg/user/kid_avatar.png";
import moment from "moment";

function Child() {
  const [child, setChild] = useState({});
  const [childInfoStatus, setChildInfoStatus] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  let { id } = useParams();

  /*
  useEffect(() => {
    axiosPrivate.get(`/user/profile`).then((response) => {
      setUserProfile(response.data);
    });
  }, []);
*/
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getChildren = async () => {
      try {
        const response = await axiosPrivate.get(`/children/${id}`, {
          signal: controller.signal,
        });

        isMounted && setChild(response.data);
      } catch (err) {
        if (!err?.response) {
          setShow(true);
          setChildInfoStatus("No Server Response");
          setTimeout(() => {
            navigate("/profile");
          }, 5000);
        } else if (err?.response.status === 404) {
          setShow(true);
          setChildInfoStatus("No Child Found");
          navigate("*");
        } else {
          //console.error(err);
          navigate("*");
        }
      }
    };
    getChildren();

    return () => {
      isMounted = false;
      //controller.abort(); commented due to causing "cancelled error"
    };
  }, []);

  const deleteChild = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/children/delete/${id}`);
      setShow2(false);
      setShow(true);
      setChildInfoStatus(response.data.message);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (err) {
      //console.error(err);
      setShow(true);
      setChildInfoStatus("err");
    }
  };

  const confirmationWindow = () => {
    setShow2(true);
  };

  const calculateAge = (birthdate) => {
    var aDate = moment(birthdate, "YYYYMMDD", true);
    var invalidAt = aDate.invalidAt(); //returns 2 for invalid day
    return moment().diff(moment(birthdate, "YYYYMMDD"), "years");
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
      <Modal
        show={show2}
        onHide={handleClose2}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div
            className={index.flexContainerCol}
            style={{
              justifyContent: "left",
              margin: "20px",
              marginBottom: "0",
            }}
          >
            <div style={{ width: "100%" }}>
              <p
                style={{
                  fontFamily: "Somatic-Rounded",
                  fontSize: "20px",
                  color: "#EF8354",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Are you sure you want to delete this child?
              </p>
            </div>
            <div
              className={index.flexContainer}
              style={{ alignContent: "center", width: "100%" }}
            >
              <button
                className={profile.btnPressed}
                style={{ width: "40%", margin: "5px" }}
                onClick={() => {
                  deleteChild(child.id);
                }}
              >
                Yes
              </button>
              <button
                className={profile.btnPressed}
                style={{ width: "40%", margin: "5px" }}
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
        style={{ backgroundColor: "inherit", maxWidth: "1400px" }}
      >
        <div
          className={index.flexContainerCol}
          style={{
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            alignContent: "center",
          }}
        >
          <div className={profile.card3}>
            <div className={index.flexContainerCol}>
              <div
                className={profile.kidImgList}
                style={{ alignSelf: "center", marginTop: "20px" }}
              >
                <img style={{ width: "100%" }} src={youthopiaKidImage1}></img>
              </div>
              <div
                className={index.flexContainer}
                style={{ justifyContent: "space-around" }}
              >
                <div style={{ width: "40%", margin: "5px" }}>
                  <p
                    className={profile.enrolCardTitlesList}
                    style={{ textAlign: "center" }}
                  >
                    {child.name}
                  </p>
                </div>
                <div style={{ width: "40%", margin: "5px" }}>
                  <p
                    className={profile.kidAge}
                    style={{
                      width: "50%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Age {calculateAge(child.birthday)}
                  </p>
                </div>
              </div>
              <div
                className={index.flexContainer}
                style={{ justifyContent: "space-around" }}
              >
                <button
                  className={profile.btnPressed}
                  style={{ width: "40%", margin: "5px" }}
                  onClick={confirmationWindow}
                >
                  Delete Child
                </button>
                <Link
                  to={`/profile/childedit/${child.id}`}
                  style={{ width: "40%", margin: "5px" }}
                  className={profile.btnPressed}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Child;
