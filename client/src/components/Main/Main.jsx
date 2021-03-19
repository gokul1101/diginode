import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Main.css";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { IconButton } from "@material-ui/core";
const Main = (props) => {
  const [toggle, setToggle] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  return (
    <div className="main h-100">
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setLogin={props.setLogin}
        snackBar={props.snackBar}
        setToggle={setToggle}
        setCurrentVideo={setCurrentVideo}
      />
      {toggle ? (
        <>
          <div id="video-overlay" className="video-overlay">
            <IconButton
              className="float-right"
              aria-label="delete"
              style={{ color: "white" }}
              onClick={() => setToggle(false)}
            >
              <CloseOutlinedIcon />
            </IconButton>
            <iframe
              title="render-video"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="container">
              <div className="iframe-content position-relative d-flex flex-column">
                <div className="social-div">
                  <h3 className="float-left">
                    Contributing to Open Source Part I: The Easy Way
                  </h3>
                  <div className="float-right">
                    <div id="heart-container">
                      <input type="checkbox" id="toggle" />
                      <div id="twitter-heart"></div>
                    </div>
                    <div className="content">
                      <div className="icon">
                        <svg
                          className="download"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25%"
                          height="25%"
                          viewBox="0 0 14 17"
                        >
                          <path
                            className="arrow"
                            fill="#fff"
                            fillRule="evenodd"
                            d="M14 6h-4V0H4v6H0l7 7 7-7z"
                          />
                          <path
                            className="line"
                            fill="#fff"
                            fillRule="evenodd"
                            d="M0 15v2h14v-2H0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="mt-2">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus, consectetur magni! In mollitia dolorum doloremque
                  reiciendis amet maxime. Facere, doloribus non eius impedit
                  quam eaque reprehenderit tenetur numquam recusandae cum?
                </h6>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Main;
