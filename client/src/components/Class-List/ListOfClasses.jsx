import React, { useState, useEffect } from "react";
import classlist from "./ClassList.module.scss";
import index from "../../index.module.scss";
import notfound from "../../assets/img/classlist/where.gif";
import LoadingSpinner from "../../Functions/CSS/Loading Screen/LoadingScreen";

import axios from "../../Functions/Api/axios";
import { Link } from "react-router-dom";

function ListOfClasses(props) {
  const [classList, setClassList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const classPerRow = 12;
  const [next, setNext] = useState(classPerRow);
  const handleMoreClass = () => {
    setNext(next + classPerRow);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get("/classes")
      .then((response) => {
        setClassList(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //create a new array by filtering the original array
  const filteredData = classList.filter((filterClassList) => {
    //if no input the return the original
    if (props.input === "") {
      return filterClassList;
    }
    //return the item which contains the user input
    else {
      return filterClassList.title.toLowerCase().includes(props.input);
    }
  });

  const processUrl = (value) => {
    return value == undefined
      ? ""
      : value
          .replace(/[^a-z0-9_]+/gi, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase();
  };

  if (filteredData.length === 0) {
    return (
      <div className={classlist.animation}>
        <div
          className={`${index.textCenter} shadow`}
          style={{ borderRadius: "15px", backgroundColor: "transparent" }}
        >
          <div style={{ alignSelf: "center", width: "100%" }}>
            <div
              className="container"
              style={{ height: "500px", marginBottom: "5rem" }}
            >
              <div
                className={index.flexContainerNotFound}
                style={{ width: "100%", height: "100%" }}
              >
                <div className={classlist.notFoundImageDiv}>
                  <img src={notfound} className={classlist.notFoundImage}></img>
                </div>
                <div className={classlist.notFoundTextDiv}>
                  <p
                    className={`${classlist.notFoundText} ${classlist.notFoundTextHover}`}
                  >
                    <span>
                      Check back again as we regularly<br></br> update our
                      classes<br></br>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div
        className={index.mainContainer}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        {!isLoading ? (
          <div
            className={`scrollmenu ${index.flexContainerCol}`}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {filteredData.slice(0, next).map((classes) => {
              if (classes.is_active === true)
                return (
                  <Link
                    to={`/${processUrl(classes.title)}/${classes.id}`}
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
                            flexGrow: "1",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <p
                              className="card-text"
                              style={{
                                fontFamily: "Quicksand-VariableFont_wght",
                                color: "teal",
                              }}
                            >
                              Ages {classes.lower_age_range} -{" "}
                              {classes.upper_age_range}
                            </p>
                            <p
                              className="card-text"
                              style={{
                                fontFamily: "Somatic-Rounded",
                                fontSize: "24px",
                                color: "slateblue",
                              }}
                            >
                              {classes.title}
                            </p>
                            <div style={{ alignSelf: "flex-start" }}>
                              <p
                                className={classlist.descriptionText}
                                style={{
                                  fontFamily: "Quicksand-VariableFont_wght",
                                  color: "#1A2B3B",
                                }}
                              >
                                {classes.description}
                              </p>
                              <p
                                className="card-text"
                                style={{
                                  fontFamily: "Quicksand-VariableFont_wght",
                                  color: "#1A2B3B",
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
                                  style={{
                                    fontFamily: "Somatic-Rounded",
                                    fontSize: "20px",
                                    color: "teal",
                                  }}
                                >
                                  RM {classes.price}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Quicksand-VariableFont_wght",
                                    color: "teal",
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
            {next < classList.length && (
              <button
                className={classlist.btnPressed}
                style={{ width: "150px", alignSelf: "center" }}
                onClick={handleMoreClass}
              >
                Load more
              </button>
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </React.Fragment>
  );
}

export default ListOfClasses;
