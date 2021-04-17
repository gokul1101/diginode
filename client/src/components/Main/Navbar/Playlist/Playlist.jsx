import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./Playlist.css";

const Playlist = (props) => {
  let [playlists, setPlaylists] = useState(
    props.playlists ? props.playlists : []
  );
  let [searchPlaylists, setSearchPlaylists] = useState(
    props.playlists ? props.playlists : []
  );
  const search = (name) => {
    if (name === "") setSearchPlaylists(playlists);
    else {
      let arr = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(name.toLowerCase())
      );
      setSearchPlaylists(arr);
    }
  };
  return (
    <div className="container-fluid playlists d-flex">
      <div className="px-2 m-4">
        <h1 className="position-relative">
          <span className="position-relative">playlists</span>
        </h1>
      </div>
      <div className="container-fluid d-flex flex-column align-items-center h-100">
        <form className="form-inline mt-3" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group mx-auto">
            <input
              type="text"
              className="form-control"
              onChange={(e) => search(e.target.value)}
              placeholder="Search a Playlist"
            />
            <i className="fa fa-search form-control-feedback position-relative"></i>
          </div>
        </form>
        <div className="d-flex align-items-center justify-content-center flex-wrap mt-5 pl-3 h-100">
          {searchPlaylists.map((playlist, index) => {
            return (
              <div
                className="flex-fill playlist-card m-3"
                onClick={(e) => console.log(e.currentTarget.id)}
                key={index}
                id={playlist? playlist.name : index}
              >
                <div className="playlist h-100 w-100">
                  <div className="playlist-img position-relative">
                    {playlist.list.length !== 0 ? (
                      <>
                        <img
                          className="img-fluid"
                          src={playlist.list[0].thumbnails}
                          alt="playlist-img"
                        />
                        <div className="playlist-play-icon d-flex align-items-center justify-content-center position-absolute">
                          <IconButton aria-label="add an alarm">
                            <PlayArrowIcon
                              style={{
                                color: "#f55050",
                                height: 40,
                                width: 40,
                              }}
                            />
                          </IconButton>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="playlist-detail d-flex align-items-center justify-content-between mt-2 pt-1 px-4">
                    <h6 className="text-white m-0">{playlist.name}</h6>
                    <p className="m-0 text-white">
                      {playlist.list.length !== 1
                        ? `${playlist.list.length} videos`
                        : `${playlist.list.length} video`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
