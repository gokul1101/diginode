import React, { useEffect, useState } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Favorite.css";

const Favorite = (props) => {
  const onloadFrame = (e) => {
    let videoId = e.currentTarget.id;
    let video = props.favorites.find((data) => data.videoId === videoId);
    props.setCurrentVideo(video);
    props.setToggle(true);
  };
  return (
    <div className="favorite">
      <VideoContainer onloadFrame={onloadFrame} fetchData={props.favorites} />
    </div>
  );
};

export default Favorite;
