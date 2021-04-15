import React, { useEffect } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Trending.css";

const Trending = (props) => {
  useEffect(() => {
    props.trendingVideos();
  }, [props, props.trendingVideos]);
  const onloadFrame = (e) => {
    props.addToHistory(e.currentTarget.id, "trending");
    props.searchVideos();
  };
  return (
    <div className="trend">
      <VideoContainer
        onloadFrame={onloadFrame}
        fetchData={props.fetchTrendData}
      />
    </div>
  );
};

export default Trending;
