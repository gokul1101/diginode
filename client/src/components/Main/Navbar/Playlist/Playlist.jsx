import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import empty from "../../../../images/empty.svg";
import "./Playlist.css";
import { Button } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Playlist = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: "#000",
      "&:hover": {
        backgroundColor: "crimson",
        color: "#fff",
      },
      color: "#fff",
    },
  }));
  const classes = useStyles();
  let [toggle, setToggle] = useState(false);
  let [playlists, setPlaylists] = useState(props.playlists);
  let [searchPlaylists, setSearchPlaylists] = useState(props.playlists);
  let [currentPlaylist, setCurrentPlaylist] = useState({});
  const search = (name) => {
    if (name === "") setSearchPlaylists(playlists);
    else {
      let arr = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(name.toLowerCase())
      );
      setSearchPlaylists(arr);
    }
  };
  const play = (playlistName) => {
    setToggle(true);
    setCurrentPlaylist(playlists.find((obj) => obj.name === playlistName));
  };
  const openIframe = (vid) => {
    props.setCurrentVideo(vid);
    props.setToggle(true);
  };
  const textShadow = () => {
    let shadow = "";
    for (let i = 0; i < 6; i++) {
      shadow += (shadow ? "," : "") + -i * 1 + "px " + i * 1 + "px 0 #d9d9d9";
    }
    return shadow;
  };
  const deleteVideoFromPlaylist = async (video, playlistName) => {
    const res = await fetch(`http://localhost:5000/removeFromPlaylist`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        playlistName,
        videoId: video.videoId,
      }),
    });
    const [playlist] = await res.json();
    if (res.status === 200) {
      props.snackBar("Video removed from playlist", "error");
      let arr = [];
      props.playlists.forEach((obj) => {
        if (obj.name === playlist.name) arr.push(playlist);
        else arr.push(obj);
      });
      props.setPlaylists(arr);
    } else props.snackBar("Something wrong in the server", "error");
  };
  useEffect(() => {
    setPlaylists(props.playlists);
    setSearchPlaylists(props.playlists);
    if (toggle)
      setCurrentPlaylist(
        props.playlists.find((obj) => obj.name === currentPlaylist.name)
      );
  }, [props.playlists]);
  const deleteAll = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/deletePlaylist", {
      method: "DELETE",
      body: JSON.stringify({
        email: localStorage.getItem("user").trim(),
        playlistName: currentPlaylist.name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      props.snackBar("Playlist Deleted Successfully", "success");
    }
    setOpen(false);
  };
  return toggle ? (
    <div className="container-fluid position-relative my-3 d-flex flex-column align-items-center justofy-content-center playlist-videos">
      <div className="d-flex w-100 mr-auto">
        <div
          className="back-to-playlist p-2 position-absolute "
          onClick={() => setToggle(false)}
        >
          <KeyboardBackspaceIcon
            style={{
              color: "#fff",
              height: 30,
              width: 40,
            }}
          />
        </div>
      </div>
      <div className="tot-delete mt-4 position-absolute">
        <Button
          className={classes.button}
          startIcon={<Delete />}
          onClick={handleClickOpen}
        >
          Delete All
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Are you sure want to delete ${currentPlaylist.name} Playlist`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Note : It deletes {currentPlaylist.name} Playlist completely
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No,doesn't
            </Button>
            <Button onClick={deleteAll} color="primary">
              Yes,I want
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {currentPlaylist.list.length !== 0 ? (
        <div
          className="d-flex position-relative auto-flex"
          style={{ top: "100px" }}
        >
          <div className="col-md-8 col-lg-3 hide-playlist">
            <div className="img-container">
              <div className="playlist-imgs position-relative">
                <img
                  src={currentPlaylist.list[0].thumbnails}
                  className="img-fluid"
                />
                <div className="playlist-overlay-img position-absolute text-center d-flex align-items-center justify-content-center p-1">
                  <i className="fab fa-google-play pr-2"></i>PLAY ALL
                </div>
              </div>
            </div>
            {console.log(currentPlaylist)}
            <div className="d-flex">
              <div className="playlist-content d-flex flex-column mt-2 mr-auto">
                <div className="d-flex">
                  <div className="play-list-text mr-auto text-wrap text-left my-2 ">
                    <span>
                      <strong>{currentPlaylist.list[0].title} &middot; {currentPlaylist.list.length} video </strong>
                    </span>
                  </div>
                </div>
                <div>
                  <span
                    style={{ fontSize: 15 }}
                    className="badge badge-success"
                  >
                    {currentPlaylist.list[0].channelTitle} 
                  </span>
                </div>
                <div className="w-75">
                  <span>{currentPlaylist.list[0].description}</span>
                </div>
                {/* <h3 className="play-name mb-2">
                  {" "}
                  <strong>{currentPlaylist.name}</strong>
                </h3>
                <span className="playlist-avg-view">
                  {currentPlaylist.list.length} video
                </span>
                <hr /> */}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {currentPlaylist.list.map((obj, index) => {
              return (
                <div
                  className="playlist-video-card position-relative p-0 mb-3"
                  key={obj.videoId}
                  data-label={obj.channelTitle}
                >
                  <div className="d-flex playchange overlay-playlist">
                    <div
                      className="col-md-12 col-lg-4 d-flex align-items-center justify-content-center p-0 playlist-demo-div"
                      onClick={() => openIframe(obj)}
                    >
                      <img
                        src={obj.thumbnails}
                        alt="playlist-video-img"
                        className="img-fluid playlist-video-img-right"
                      />
                    </div>
                    <div
                      className="col-md-12 col-lg-8 p-2 overlay-playlist"
                      onClick={() => openIframe(obj)}
                    >
                      <div className="d-flex">
                        <div className="play-list-text mr-auto text-wrap text-left my-2 ">
                          <span>
                            <strong>{`${index + 1}. ${obj.title}`}</strong>
                          </span>
                        </div>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteVideoFromPlaylist(obj, currentPlaylist.name);
                          }}
                          aria-label="delete"
                          style={{ color: "white" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <div>
                        <span
                          style={{ fontSize: 15 }}
                          className="badge badge-success"
                        >
                          {obj.channelTitle}
                        </span>
                      </div>
                      <div className="w-75">
                        <span>{obj.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          id="nodata"
          className="d-flex align-items-center justify-content-between mt-4"
        >
          <img className="img-fluid mt-5 mr-3" src={empty} alt="nodata" />
          <div
            id="text"
            style={{ textShadow: textShadow() }}
            data-text="You doesn't created any playlist yet."
            className="mt-5 ml-3 position-relative text-white text-center"
          >
            You doesn't add any videos yet.
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="container-fluid playlists d-flex">
      <div className="container-fluid d-flex flex-column align-items-center">
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
        <div
          className={`d-flex ${
            searchPlaylists.length === 0
              ? ""
              : "align-items-center justify-content-center"
          } flex-wrap mt-5 pl-3`}
        >
          {searchPlaylists.length === 0 ? (
            <div
              id="nodata"
              className="d-flex align-items-center justify-content-between mt-4"
            >
              <img className="img-fluid mt-3 mr-3" src={empty} alt="nodata" />
              <div
                id="text"
                style={{ textShadow: textShadow() }}
                data-text="You doesn't created any playlist yet."
                className="mt-3 ml-3 position-relative text-white text-center"
              >
                You doesn't created any playlist yet.
              </div>
            </div>
          ) : (
            searchPlaylists.map((playlist, index) => {
              return (
                <div
                  className="flex-fill playlist-card m-3 "
                  onClick={(e) => play(e.currentTarget.id)}
                  key={index}
                  id={playlist ? playlist.name : index}
                >
                  <div className="playlist h-100 w-100">
                    <div className="playlist-img position-relative">
                      {playlist.list.length === 0 ? (
                        <>
                          <img
                            className="img-fluid"
                            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                            alt="playlist-img"
                          />
                          <div className="playlist-play-icon d-flex align-items-center justify-content-center position-absolute">
                            <IconButton aria-label="playlist">
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
                        <img
                          className="img-fluid"
                          src={playlist.list[0].thumbnails}
                          alt="playlist-img"
                        />
                      )}
                      {playlist.list.length !== 0 ? (
                        <>
                          <div className="playlist-play-icon d-flex align-items-center justify-content-center position-absolute">
                            <IconButton aria-label="playlist">
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;

/*
  <div className="page_404">
                        <div class="container">
                          <div class="row">
                            <div class="col-sm-12 col-lg-12 bg-dark">
                              <div class="col-sm-10 col-lg-12 col-sm-offset-1 text-center">
                                <div class="four_zero_four_bg">
                                  <h2 class="text-center ">NO DATA FOUND</h2>
                                </div>

                                <div class="contant_box_404">
                                  <h3 class="h2">Look like you're lost</h3>

                                  <p>
                                    the page you are looking for not avaible!
                                  </p>

                                  <a href="" class="link_404">
                                    Go to Home
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
*/

{
  /* {searchPlaylists.map((fillplay) => {
          {
            {console.log(fillplay.list.length)}
            fillplay.list.length !== 0 ? (
              <>
                <div className="col-md-8 col-lg-3  hide-playlist">
                  <div className="img-container">
                    <div className="playlist-imgs position-relative">
                      <img
                        src="https://i.ytimg.com/vi/fRD_3vJagxk/hqdefault.jpg"
                        className="img-fluid"
                      />
                      <div className="playlist-overlay-img position-absolute text-center d-flex align-items-center justify-content-center p-1">
                        <i className="fab fa-google-play pr-2"></i>PLAY ALL
                      </div>
                    </div>
                  </div>
                  <div className="playlist-content mt-2">
                    <h3 className="play-name mb-2">
                      {" "}
                      <strong>Avenger - Age of Ultron</strong>
                    </h3>
                    <span className="playlist-avg-view">
                      33 videos <span> &bull; </span> 7,942 views{" "}
                      <span> &bull; </span> Last updated on Oct 2, 2020{" "}
                    </span>
                    <hr />
                  </div>
                </div>
                <div className="col-md-9">
                  {currentPlaylist.list.map((obj, index) => {
                    return (
                      <div
                        className="playlist-video-card position-relative p-0 mb-3"
                        key={obj.videoId}
                        data-label={obj.channelTitle}
                      >
                        <div className="d-flex playchange overlay-playlist">
                          <div
                            className="col-md-12 col-lg-4 d-flex align-items-center justify-content-center p-0 playlist-demo-div"
                            onClick={() => openIframe(obj)}
                          >
                            <img
                              src={obj.thumbnails}
                              alt="playlist-video-img"
                              className="img-fluid playlist-video-img-right"
                            />
                          </div>
                          <div
                            className="col-md-12 col-lg-8 p-2 overlay-playlist"
                            onClick={() => openIframe(obj)}
                          >
                            <div className="d-flex">
                              <div className="play-list-text mr-auto text-wrap text-left my-2 ">
                                <span>
                                  <strong>{`${index + 1}. ${
                                    obj.title
                                  }`}</strong>
                                </span>
                              </div>
                              <div className="">
                                <IconButton
                                  onClick={() =>
                                    deleteVideoFromPlaylist(
                                      obj,
                                      currentPlaylist.name
                                    )
                                  }
                                  aria-label="delete"
                                  style={{ color: "white" }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            </div>
                            <div>
                              <span
                                style={{ fontSize: 15 }}
                                className="badge badge-success"
                              >
                                {obj.channelTitle}
                              </span>
                            </div>
                            <div className="w-75">
                              <span>{obj.description}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              
              </>
            ) : (
              <div
                id="nodata"
                className="d-flex align-items-center justify-content-between mt-4"
              >
                <img className="img-fluid mt-3 mr-3" src={empty} alt="nodata" />
                <div
                  id="text"
                  style={{ textShadow: textShadow() }}
                  data-text="You doesn't created any playlist yet."
                  className="mt-3 ml-3 position-relative text-white text-center"
                >
                  You doesn't created any playlist yet.
                </div>
              </div>
            );
          }
        })} */
}
