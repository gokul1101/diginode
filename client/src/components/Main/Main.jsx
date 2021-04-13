import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Main.css";
import Iframe from "./Iframe/Iframe";
const Main = (props) => {
  const [favorites, setFavorites] = useState(
    Object.keys(props.user).length === 0 ? [] : props.user.favorites
  );
  const [playlists, setPlaylists] = useState(
    Object.keys(props.user).length === 0 ? [] : props.user.playlists
  );
  const [toggle, setToggle] = useState(false);
  const [currentVideo, setCurrentVideo] = useState([]);
  return (
    <div className="main h-100">
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setLogin={props.setLogin}
        snackBar={props.snackBar}
        setToggle={setToggle}
        favorites={favorites}
        setFavorites={setFavorites}
        playlists={playlists}
        setPlaylists={setPlaylists}
        setCurrentVideo={setCurrentVideo}
      />
      {toggle ? (
        <Iframe
          setToggle={setToggle}
          favorites={favorites}
          setFavorites={setFavorites}
          playlists={playlists}
          setPlaylists={setPlaylists}
          currentVideo={currentVideo}
          snackBar={props.snackBar}
        />
      ) : null}
    </div>
  );
};

export default Main;
