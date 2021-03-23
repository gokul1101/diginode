import React, { useState } from "react";
import "./Iframe.css";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { IconButton } from "@material-ui/core";
const Iframe = (props) => {
  const [checkFavorite, setCheckFavorite] = useState(
    props.favorites.filter((fav) => fav.videoId === props.currentVideo.videoId).length === 1
  );
  const setFavorite = async (videoId) => {
    setCheckFavorite(!checkFavorite)
    const res = await fetch(`http://localhost:5000/video/${videoId}/favorite`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("user"),
        channelTitle: props.currentVideo.channelTitle,
        description: props.currentVideo.description,
        thumbnails: props.currentVideo.thumbnails,
        title: props.currentVideo.title,
        videoId,
      }),
    });
    const data = await res.json();
    props.setFavorites(data);
  };
  return (
    <div
      id="video-overlay"
      className="video-overlay d-flex flex-column align-items-center justify-content-center h-100"
    >
      <IconButton
        className="close-btn position-absolute"
        aria-label="delete"
        style={{ color: "white" }}
        onClick={() => props.setToggle(false)}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <iframe
        title="render-video"
        className="mb-5"
        src={`https://www.youtube.com/embed/${props.currentVideo.videoId}?autoplay=1&;enablejsapi=1?rel=0&showinfo=0`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      ></iframe>
      <div className="container">
        <div className="iframe-content position-relative d-flex flex-column">
          <div className="social-div">
            <h3 className="float-left">{props.currentVideo.title}</h3>
            <div className="float-right">
              <div id="heart-container">
                <input
                  type="checkbox"
                  defaultChecked={checkFavorite}
                  id="toggle"
                  className="btn"
                  onClick={() => setFavorite(props.currentVideo.videoId)}
                />
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
          <h6 className="mt-2">{props.currentVideo.channelTitle}</h6>
          <h6 className="mt-2">{props.currentVideo.description}</h6>
        </div>
      </div>
    </div>
  );
};

export default Iframe;
