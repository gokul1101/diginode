import React, { useEffect } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Trending.css";

const Trending = (props) => {  
  useEffect(()=>{
    props.trendingVideos();
  },[]);
  const onloadFrame = (e) => {
    let videoId = e.currentTarget.id;
    let video = props.fetchTrendData.find((data) => data.videoId === videoId);
    props.setCurrentVideo(video);
    props.setToggle(true);
  }
  return (
    <div>
      <VideoContainer fetchData={props.fetchTrendData} onloadFrame={onloadFrame}/>
    </div>
  );
};

export default Trending;
