import React from "react";
import "./Playlist.css";

const Playlist = (props) => {
  
  return (
    <div>
      {
        props.playlists.map(item => console.log(item))
      }
    </div>
  );
};

export default Playlist;
