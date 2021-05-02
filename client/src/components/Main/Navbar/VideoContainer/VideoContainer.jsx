import React from "react";
import "./VideoContainer.css";
import { Link } from "react-router-dom";
const VideoContainer = (props) => {
  return (
    <div className="container p-0">
      <div
        className={`d-flex flex-wrap ${
          props.fetchData.length === 0
            ? "align-items-center justify-content-center"
            : ""
        }`}
      >
        {props.fetchData.length === 0 ? (
          <div className="no-data">
            <svg viewBox="0 0 800 600">
              <symbol id="s-text">
                <text
                  textAnchor="middle"
                  x="50%"
                  y="35%"
                  className="text--line"
                >
                  No data
                </text>
                <text
                  textAnchor="middle"
                  x="50%"
                  y="68%"
                  className="text--line2"
                >
                  Found
                </text>
              </symbol>
              <g className="g-ants">
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
              </g>
            </svg>
          </div>
        ) : (
          props.fetchData.map((item, index) => {
            return (
              <div
                className="col-md-6 col-lg-4 mb-5"
                key={index}
                id={item.videoId}
                onClick={props.onloadFrame}
              >
                <div className="item-card">
                  <img
                    src={item.thumbnails}
                    className="img-fluid"
                    alt="card-content"
                  />
                  <div className="info">
                    <Link id="play-video" className="video-play-button" to="/">
                      <span></span>
                    </Link>

                    <h6 className="text">{item.title}</h6>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VideoContainer;
