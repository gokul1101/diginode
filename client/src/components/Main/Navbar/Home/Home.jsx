import React, { useEffect, useState } from "react";
import "./Home.css";
const Home = (props) => {
  const [fetchData, setFetchData] = useState([]);
  const getData = async () => {
    const API_KEY = "AIzaSyBsAyZ97pvZLsFrIdwiYhDCR5ag9aXvQuQ";
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=vaathicoming&maxResults=1&key=${API_KEY}`;
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
            id: item.id.videoId,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.high.url,
          };
        })
    );
    
  };

  useEffect(() => {
    getData();
  }, []);

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
          <h5 className="float-right">Clear</h5>
          <div className="container-fluid continue-scroll">
            <div className="row flex-row flex-nowrap">
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src="https://i.pinimg.com/originals/75/4b/ac/754bac39e8cbb873ea4939bf83b182c4.jpg"
                      height="150"
                      width="150"
                      alt="img"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column">
                      <h6>Peaky Blinders</h6>
                      <h6>Season 1 Episode 2</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src="https://cdnb.artstation.com/p/assets/images/images/019/151/793/large/p-m-highlanders-strangerthings3-fanart-xxs.jpg?1562233903"
                      height="150"
                      width="150"
                      alt="img"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column">
                      <h6>Stranger Things</h6>
                      <h6>Season 1 Episode 2</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKx-weqDKoqf3RJ9uk1ac-WknfW48-CZLgww&usqp=CAU"
                      height="150"
                      width="150"
                      alt="img"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column">
                      <h6>Game of Thrones</h6>
                      <h6>Season 1 Episode 2</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src="https://starsgab.com/wp-content/uploads/2020/05/Money-Heist-Cover.jpg"
                      height="150"
                      width="150"
                      alt="img"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="flex-column">
                      <h6>Money Heist</h6>
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
      <div className="container">
        <div className="d-flex flex-wrap">
          {fetchData.map((item, index) => {
            console.log(fetchData);
            return (
              <div className="col-md-4" key={index}>
                <img
                  className="img-fluid"
                  src={item.thumbnails}
                  height="480"
                  width="360"
                  alt="img"
                />
                <div className="d-flex">
                  <div className="rounded-img mt-3 mr-4">
                    <img
                      className="rounded-circle"
                      src={item.thumbnails}
                      height="50"
                      width="50"
                      alt="img"
                    />
                  </div>
                  <div className="flex-column mt-3">
                    <h6
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "bolder" }}
                    >
                      {item.description}
                    </h6>
                    <h6 className="mb-1" style={{ fontSize: "14px" }}>
                      {item.channelTitle}
                    </h6>
                    <h6 className="mb-2" style={{ fontSize: "14px" }}>
                      53M &bull; 5 years ago
                    </h6>
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
