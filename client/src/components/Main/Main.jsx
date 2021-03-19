import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Main.css";

import Iframe from "./Iframe/Iframe";
const Main = (props) => {
  const [query, setQuery] = useState("")
  const [toggle, setToggle] = useState(false);
  const [currentVideo, setCurrentVideo] = useState([]);
  return (
    <div className="main h-100">
      <Navbar
        query={query}
        setQuery={setQuery}
        user={props.user}
        setUser={props.setUser}
        setLogin={props.setLogin}
        snackBar={props.snackBar}
        setToggle={setToggle}
        setCurrentVideo={setCurrentVideo}
      />
      {toggle ? <Iframe setToggle={setToggle} currentVideo={currentVideo} /> : null}
    </div>
  );
};

export default Main;
