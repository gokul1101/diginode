import React, { useEffect } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Trending.css";

const Trending = (props) => {
  useEffect(() => {
    props.trendingVideos();
  }, []);
  const onloadFrame = (e) => {
    props.addToHistory(e.currentTarget.id, "trending");
    props.searchVideos();
  };
  return (
    <div className="container trend">
      <VideoContainer
        onloadFrame={onloadFrame}
        fetchData={props.fetchTrendData}
      />
    </div>
  );
};

export default Trending;
