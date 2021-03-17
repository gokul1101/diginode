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
        setLogin={props.setLogin}
        snackBar={props.snackBar}
        setToggle={setToggle}
        setCurrentVideo={setCurrentVideo}
      />
      {toggle ? (
        <div id="video-overlay" className="video-overlay">
          <IconButton aria-label="delete" style={{ color: "white" }} onClick={() => setToggle(false)}>
            <CloseOutlinedIcon />
          </IconButton>
          <iframe
            title="render-video"
            src={`https://www.youtube.com/embed/${currentVideo}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
