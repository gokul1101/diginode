import React from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Favorite.css";
import empty from "../../../../images/empty.svg";
const Favorite = (props) => {
  const onloadFrame = (e) => {
    let videoId = e.currentTarget.id;
    let video = props.favorites.find((data) => data.videoId === videoId);
    props.setCurrentVideo(video);
    props.setToggle(true);
  };
  const textShadow = () => {
    let shadow = "";
    for (let i = 0; i < 6; i++) {
      shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 #d9d9d9";
    }
    return shadow;
  };
  return (
    <div className="favorite d-flex justify-content-center">
      {props.favorites.length === 0 ? (
        <div
          id="nodata"
          className="d-flex align-items-center justify-content-between mt-4 mr-3"
        >
          <img className="img-fluid mt-3 mr-4" src={empty} alt="nodata" />
          <div
            id="text"
            style={{ textShadow: textShadow() }}
            data-text="You doesn't have any favorite video yet"
            className="mt-3 ml-3 position-relative text-white text-center"
          >
            You doesn't have any favorite video yet.
          </div>
        </div>
      ) : (
        <VideoContainer onloadFrame={onloadFrame} fetchData={props.favorites} />
      )}
    </div>
  );
};

export default Favorite;
