import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = (props) => {
<<<<<<< HEAD
  const [fetchData, setFetchData] = useState([]);
  const [history, setHistory] = useState(
    Object.keys(props.user).length === 0 ? [] : props.user.history
  );
=======
  
  const [history, setHistory] = useState(Object.keys(props.user).length === 0?[]: props.user.history);
>>>>>>> d4f7b0976dccafa8b6d5acbfe1eb108d88695861
  const getData = async () => {
    if (Object.keys(props.user).length === 0) {
      const url = "http://localhost:5000/login";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: localStorage.getItem("user"),
          password: localStorage.getItem("password"),
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status === 200) {
        let userDetails = await res.json();
        props.setUser(userDetails);
        props.snackBar("Welcome back!!!", "success");
        setHistory(userDetails.history);
      } else if (res.status === 404) props.snackBar("user not found", "info");
      else if (res.status === 401)
        props.snackBar("Incorrect password", "error");
      else props.snackBar("Something wrong in the server", "error");
    }
<<<<<<< HEAD
    const API_KEY = "AIzaSyCdXjI8f3QWwf6HEWVYAPU4-ZVrn4kPoRw";
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=vaathi&maxResults=2&key=${API_KEY}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setFetchData(
      data.items
        .filter((item) => item.id.videoId !== undefined)
        .map((item) => {
          return {
            videoId: item.id.videoId,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
          };
        })
    );
=======
    props.searchVideos()
>>>>>>> d4f7b0976dccafa8b6d5acbfe1eb108d88695861
  };
  const deleteVideoHistory = async (video) => {
    const res = await fetch(
      `http://localhost:5000/video/${video.videoId}/delete`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("user"),
          videoId: video.videoId,
        }),
      }
    );
    const data = await res.json();
    props.snackBar("Video deleted Successfully", "info")
    setHistory(data);
  };
  const clearHistory = async () => {
    await fetch(`http://localhost:5000/video/clearHistory`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("user"),
      }),
    });
    if(history.length !== 0)props.snackBar("History cleared Successfully", "info")
    setHistory([]);
  };
  useEffect(() => {
    getData();
  }, []);

  const onloadFrame = async (e) => {
    let videoId = e.currentTarget.id;
    props.setCurrentVideo(videoId);
    props.setToggle(true);
    let { channelTitle, description, thumbnails, title } = props.fetchData.find(
      (data) => data.videoId === videoId
    );
    const res = await fetch(`http://localhost:5000/video/${videoId}/history`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("user"),
        channelTitle,
        description,
        thumbnails,
        title,
        videoId,
      }),
    });
    const data = await res.json();
    // setHistory(data);
  };
  return (
    <>
      {/* Banner Content */}
      <div className="trending-area mt-3 mb-5">
        <div className="container">
          <div className="trending-main">
            <div className="row">
              <div className="d-flex align-items-center justify-content-center col-lg-8 mb-2">
                <div className="d-flex align-items-center justify-content-center top-banner">
                  <div className="top-bannner-img position-relative">
                    <img
                      src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                      alt=""
                    />
                    <div className="top-banner-text position-absolute">
                      <h2>
                        Anna Lora Stuns In White At Her Australian Premiere
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-6 mb-3">
                    <div className="top-banner">
                      <div className="top-bannner-img position-relative">
                        <img
                          src="https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                        <div className="top-banner-text top-banner-text2 position-absolute">
                          <h2>
                            Secretart for Economic Air plane that looks like
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-6">
                    <div className="top-banner">
                      <div className="top-bannner-img position-relative">
                        <img
                          src="https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                        <div className="top-banner-text top-banner-text2 position-absolute">
                          <h2>
                            Secretart for Economic Air plane that looks like
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal Scrolling Div (Continue Watching) */}
      <div className="continue-watch">
        <div className="continue-text mb-5">
          <h5 className="float-left mb-3">Continue Watching</h5>
          {/* <Button
            variant="outlined"
            onClick={clearHistory}
            style={{ color: "white", borderColor: "white" }}
            className="float-right"
            endIcon={<DeleteIcon />}
            size="small"
          >
            Clear
          </Button> */}

          <button
            className="iconbutton float-right d-flex"
            onClick={clearHistory}
            style={{ color: "white", borderColor: "white" }}
          >
            <h6 className="mt-2 mr-2" style={{fontWeight:'700'}}>CLEAR</h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="-2 -10 18 28"
              className="delete-animation"
            >
              <path
                d="M10.5,2.3V1.5c0,0,0-0.1,0-0.1C10.5,0.6,9.8,0,9,0H6c0,0-0.1,0-0.1,0C5.1,0,4.5,0.7,4.5,1.5v0.8H0v1.5h15V2.3H10.5z M9,2.2  H6V1.5h3V2.2z"
                className="lid"
              />
              <g className="can">
                <path d="M12.8,3.8v12c0,0,0,0,0,0.1c0,0.4-0.4,0.7-0.8,0.7H3c0,0,0,0-0.1,0c-0.4,0-0.7-0.4-0.7-0.8v-12H0.8v12   c0,0.6,0.2,1.2,0.7,1.6C1.8,17.8,2.4,18,3,18h9c0,0,0,0,0,0c1.2,0,2.2-1,2.2-2.2v-12H12.8z" />
                <rect x="3.8" y="6" width="1.5" height="8.2" />
                <rect x="6.8" y="6" width="1.5" height="8.2" />
                <rect x="9.8" y="6" width="1.5" height="8.2" />
              </g>
            </svg>
          </button>

          <div className="container-fluid continue-scroll">
            <div className="row flex-nowrap watching mt-3">
              {history.map((item, index) => {
                return (
                  <div
                    className="col-12  col-sm-6 col-md-6 col-lg-4"
                    key={index}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center position-relative"
                      id="history"
                    >
                      <div className="delete-button position-absolute">
                        <IconButton
                          onClick={() => deleteVideoHistory(item)}
                          aria-label="delete"
                          style={{ color: "white" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <div className="col-md-6">
                        <img
                          className="img-fluid"
                          src={item.thumbnails}
                          height="150"
                          width="150"
                          alt="img"
                        />
                      </div>
                      <div className="col-md-6 ">
                        <div className="flex-column">
                          <h6>{item.title.split("|").shift()}</h6>
                          <h6>{item.channelTitle}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      
      {/* Video Cards */}
      <div className="container p-0">
        <div className="d-flex flex-wrap">
          {props.fetchData.map((item, index) => {
            return (
              <div
                className="col-md-6 col-lg-4 mb-5"
                key={index}
                id={item.videoId}
                onClick={onloadFrame}
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
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
