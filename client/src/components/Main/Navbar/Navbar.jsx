import React from "react";
import Favorite from "./Favorites/Favorite";
import Home from "./Home/Home";
import Playlist from "./Playlist/Playlist";
import Trending from "./Trending/Trending";
import "./Navbar.css";
import {Link} from "react-router-dom";
const Navbar = (props) => {
  
  let color = "#xxxxxx".replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
  );
  const logout = () => {
    localStorage.removeItem("user");
    props.setLogin(false);
    props.snackBar("Logged out successfully!!!", "success")
  }

  return (
    <div>
      <div className="container-fluid p-0 nav-div">
        <nav className="navbar navbar-expand-lg  bg-transparent d-flex align-items-center justify-content-space-around">
          <Link to="/" className="navbar-brand mt-2" >
            DIGINODE
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="nav nav-pills navbar-nav mr-auto px-3 d-flex align-items-center justify-content-center w-100"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  HOME
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  TRENDING
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  MY PLAYLIST
                </a>
              </li>
              <li className="nav-item px-2" role="presentation">
                <a
                  className="nav-link"
                  id="pills-favorite-tab"
                  data-toggle="pill"
                  href="#pills-favorite"
                  role="tab"
                  aria-controls="pills-favorite"
                  aria-selected="false"
                >
                  FAVORITES
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center justify-content-center">
              <form className="form-inline">
                <div className="form-group">
                  <input type="text" className="form-control" />
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
                    D
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link to="/login" onClick={logout} className="dropdown-item" >
                      Logout
                    </Link>
                    <Link to="/" className="dropdown-item" >
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
            <Home user={props.user}/>
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
            <Favorite user={props.user}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
