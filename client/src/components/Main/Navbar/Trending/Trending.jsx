import React, { useEffect } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Trending.css";

const Trending = (props) => {  
  useEffect(()=>{
    props.trendingVideos();
  },[])
  return (
    <div>
      <VideoContainer fetchData={props.fetchTrendData} />
    </div>
  );
};

export default Trending;
