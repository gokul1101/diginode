import React, { useState } from "react";
import Favorite from "./Favorites/Favorite";
import Home from "./Home/Home";
import Playlist from "./Playlist/Playlist";
import Trending from "./Trending/Trending";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const [query, setQuery] = useState("");

  const [fetchData, setFetchData] = useState([]);
  let color = "#xxxxxx".replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
  );
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    props.setLogin(false);
    props.snackBar("Logged out successfully!!!", "success");
  };
  const searchVideos = async () => {
    const API_KEY = "AIzaSyBsAyZ97pvZLsFrIdwiYhDCR5ag9aXvQuQ"; //AIzaSyCdXjI8f3QWwf6HEWVYAPU4-ZVrn4kPoRw
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=11.127123%2C78.656891&locationRadius=10mi&q=${query}&type=video&maxResults=1&key=${API_KEY}`;
    if (query !== "")
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`;
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
  };
  return (
    <div>
      <div className="container-fluid p-0 nav-div">
        <nav className="navbar navbar-expand-lg  bg-transparent d-flex align-items-center justify-content-space-around">
          <Link className="navbar-brand mt-2">
            <h1 className="nav-text">DIGINODE</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>

          <div
            className="collapse navbar-collapse py-3"
            id="navbarSupportedContent"
          >
            <ul
              className="nav nav-pills navbar-nav mr-auto px-3 mt-2 d-flex align-items-center justify-content-center w-100"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item " role="presentation">
                <a
                  className="nav-link active navIcon"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <span className="dot"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    hoverable="false"
                    fill="currentColor"
                    className="bi bi-house-fill svgIcon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>

                  <span className="text-li">HOME</span>
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link navIcon"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <span className="dot"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    hoverable="false"
                    fill="currentColor"
                    className="bi bi-bar-chart-line svgIcon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                  </svg>
                  <span className="text-li">TRENDING</span>
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link navIcon"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  <span className="dot"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    hoverable="false"
                    fill="currentColor"
                    className="bi bi-music-note-list svgIcon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
                    <path fillule="evenodd" d="M12 3v10h-1V3h1z" />
                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z" />
                    <path
                      fillule="evenodd"
                      d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                  <span className="text-li">PLAYLIST</span>
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link navIcon"
                  id="pills-favorite-tab"
                  data-toggle="pill"
                  href="#pills-favorite"
                  role="tab"
                  aria-controls="pills-favorite"
                  aria-selected="false"
                >
                  <span className="dot"></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    hoverable="false"
                    fill="currentColor"
                    className="bi bi-heart-fill svgIcon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  <span className="text-li">FAVORITES</span>
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center justify-content-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  searchVideos();
                }}
                className="form-inline"
              >
                <div className="form-group">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-control"
                  />
                  <i className="fa fa-search form-control-feedback position-relative"></i>
                </div>
              </form>
              <li className="nav-item mr-3">
                <div className="dropdown dropleft">
                  <button
                    style={{
                      height: "40px",
                      width: "40px",
                      left: "19px",
                      backgroundColor: `${color}`,
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "18px",
                      padding: "7px",
                      fontWeight: "800",
                      textAlign: "center",
                      border: "none",
                    }}
                    className="btn btn-secondary position-relative"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {Object.keys(props.user).length === 0
                      ? ""
                      : props.user.name.charAt(0)}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      to="/login"
                      onClick={logout}
                      className="dropdown-item"
                    >
                      Logout
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Home
              searchVideos={searchVideos}
              fetchData={fetchData}
              user={props.user}
              setUser={props.setUser}
              snackBar={props.snackBar}
              setCurrentVideo={props.setCurrentVideo}
              setFavorites={props.setFavorites}
              setToggle={props.setToggle}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Trending />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <Playlist />
          </div>
          <div
            className="tab-pane fade"
            id="pills-favorite"
            role="tabpanel"
            aria-labelledby="pills-favorite-tab"
          >
            <Favorite
              favorites={props.favorites}
              setCurrentVideo={props.setCurrentVideo}
              setToggle={props.setToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
