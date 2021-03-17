import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = (props) => {
  const [fetchData, setFetchData] = useState([]);
  const getData = async () => {
    const API_KEY = "AIzaSyBsAyZ97pvZLsFrIdwiYhDCR5ag9aXvQuQ";
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=kandavara&maxResults=1&key=${API_KEY}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
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
  };

  useEffect(() => {
    getData();
  }, []);

  const onloadFrame = async(e) => {
    let videoId = e.currentTarget.id
     props.setCurrentVideo(videoId);
     props.setToggle(true)
     let {channelTitle,description,thumbnails,title} = fetchData.find((data) => data.videoId === videoId )
     const res = await fetch(`http://localhost:5000/video/${videoId}/history`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        email:localStorage.getItem("user"),
        channelTitle,
        description,
        thumbnails,
        title,
        videoId
      })
    });
    const data = await res.json();
    console.log(data);
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
          <Button
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
            className="float-right"
            endIcon={<DeleteIcon />}
            size="small"
          >
            Clear
          </Button>
          <div className="container-fluid continue-scroll">
            <div className="row flex-row flex-nowrap">
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  className="d-flex align-items-center justify-content-center position-relative"
                  id="history"
                >
                  <div className="delete-button position-absolute">
                    <IconButton aria-label="delete" style={{ color: "white" }}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src="https://i.pinimg.com/originals/75/4b/ac/754bac39e8cbb873ea4939bf83b182c4.jpg"
                      height="150"
                      width="150"
                      alt="img"
                    />
                  </div>
                  <div className="col-md-6 ">
                    <div className="flex-column">
                      <h6>Peaky Blinders</h6>
                      <h6>Season 1 Episode 2</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video Cards */}
      <div className="container p-0">
        <div className="d-flex flex-wrap">
          {fetchData.map((item, index) => {
            console.log(fetchData);
            return (
              <div
                className="col-md-6 col-lg-4 mb-5"
                key={index}
                id = {item.videoId}
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
