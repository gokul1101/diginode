import React, { useEffect } from "react";
import "./Home.css";
const Home = () => {
  // const getData = async () => {
  //   const API_KEY = "AIzaSyBsAyZ97pvZLsFrIdwiYhDCR5ag9aXvQuQ";
  //   const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=react&maxResults=1&key=${API_KEY}`;
  //   const res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      {/* Banner Content */}
      <div className="trending-area mt-3 mb-4">
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
                        <a href="#">
                          Anna Lora Stuns In White At Her Australian Premiere
                        </a>
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
                            <a href="#">
                              Secretart for Economic Air plane that looks like
                            </a>
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
                            <a href="#">
                              Secretart for Economic Air plane that looks like
                            </a>
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
        <div className="continue-text">
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
        <div className="d-flex flex-wrap"></div>
      </div>
    </>
  );
};

export default Home;
