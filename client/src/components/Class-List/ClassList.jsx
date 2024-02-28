import React, { useState, useEffect } from "react";
import classlist from "./ClassList.module.scss";
import index from "../../index.module.scss";
import ListOfClasses from "./ListOfClasses";

function ClassList() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          backgroundColor: "inherit",
          paddingTop: "20px",
          maxWidth: "1400px",
          paddingBottom: "20px",
        }}
      >
        {/*SEARCH BAR*/}
        <div style={{ backgroundColor: "#ebf4f8", borderRadius: "15px" }}>
          <div
            className={`${index.mainContainer} ,  ${index.flexContainer}`}
            style={{ justifyContent: "left", marginLeft: "10px" }}
          >
            <div className={index.flexContainerCol} style={{ width: "100%" }}>
              <div>
                <p className={classlist.mainTitles}>Find Classes</p>
              </div>
              <div className="form-group" style={{ width: "90%" }}>
                <form style={{ display: "flex" }}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Classes"
                    name="searchText"
                    style={{ flex: "2" }}
                    onChange={inputHandler}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/*CLASS-LIST*/}
        <ListOfClasses input={inputText} />
      </div>
    </React.Fragment>
  );
}

export default ClassList;
