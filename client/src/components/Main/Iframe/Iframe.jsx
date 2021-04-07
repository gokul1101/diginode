import React, { useState } from "react";
import "./Iframe.css";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormatIndentDecreaseOutlinedIcon from "@material-ui/icons/FormatIndentDecreaseOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
const Iframe = (props) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    props.snackBar("Added to Playlist", "success");
    setOpen(false);
  };

  const onCreatedList = () => {
    props.snackBar("Successfully created Playlist", "success");
    setOpen(false);
  };
  const [checkFavorite, setCheckFavorite] = useState(
    props.favorites.filter((fav) => fav.videoId === props.currentVideo.videoId)
      .length === 1
  );
  const setFavorite = async (videoId) => {
    setCheckFavorite(!checkFavorite);
    const res = await fetch(`http://localhost:5000/video/${videoId}/favorite`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("user"),
        channelTitle: props.currentVideo.channelTitle,
        description: props.currentVideo.description,
        thumbnails: props.currentVideo.thumbnails,
        title: props.currentVideo.title,
        videoId,
      }),
    });
    const {data, flag} = await res.json();
    props.snackBar(flag?"Added to favorties":"Removed from favorites", flag?"success":"error");
    props.setFavorites(data);
  };
  const confirmDownload = () => {}
  return (
    <div
      id="video-overlay"
      className="video-overlay d-flex flex-column align-items-center justify-content-center h-100"
    >
      <IconButton
        className="close-btn position-absolute"
        aria-label="delete"
        style={{ color: "white" }}
        onClick={() => props.setToggle(false)}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <iframe
        title="render-video"
        className="mb-5"
        src={`https://www.youtube.com/embed/${props.currentVideo.videoId}?autoplay=1&;enablejsapi=1?rel=0&showinfo=0`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      ></iframe>
      <div className="container">
        <div className="row">
          <div className="col-md-10 iframe-cont">
            <span className="badge badge-info mr-2">
              {props.currentVideo.channelTitle}
            </span>
            <span className="badge badge-success w-auto">
              {props.currentVideo.description}
            </span>
            <h3 className="mt-2">{props.currentVideo.title}</h3>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-center iframe-icon">
            <div id="heart-container">
              <input
                type="checkbox"
                defaultChecked={checkFavorite}
                id="toggle"
                className="btn"
                onClick={() => setFavorite(props.currentVideo.videoId)}
              />
              <div id="twitter-heart"></div>
            </div>

            <div className="content pr-4 download" onClick={confirmDownload}>
              <div className="icon">
                <svg
                  className="download"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25%"
                  height="25%"
                  viewBox="0 0 14 17"
                >
                  <path
                    className="arrow"
                    fill="#fff"
                    fillRule="evenodd"
                    d="M14 6h-4V0H4v6H0l7 7 7-7z"
                  />
                  <path
                    className="line"
                    fill="#fff"
                    fillRule="evenodd"
                    d="M0 15v2h14v-2H0z"
                  />
                </svg>
              </div>
            </div>

            <i
              title="Add to Playlist"
              className="fas fa-sliders-h"
              style={{ fontSize: "26px", marginTop: "-8px" }}
              onClick={handleClickOpen}
            ></i>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"ADD OR CREATE PLAYLIST"}
              </DialogTitle>
              <DialogContent>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<AddCircleOutlinedIcon />}
                  onClick={() => {
                    setCreatePlaylist(false);
                  }}
                >
                  ADD PLAYLIST
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  color="secondary"
                  endIcon={<FormatIndentDecreaseOutlinedIcon />}
                  onClick={() => {
                    setCreatePlaylist(true);
                  }}
                >
                  CREATE PLAYLIST
                </Button>
                <div className="li-overlay mt-3">
                  {createPlaylist ? (
                    <div className="d-flex">
                      <input
                        className="p-2 mr-3"
                        placeholder="Name of the playlist"
                        style={{
                          border: "none",
                          borderRadius: "10px",
                        }}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        endIcon={<AddCircleOutlinedIcon />}
                        onClick={onCreatedList}
                      >
                        ADD
                      </Button>
                    </div>
                  ) : (
                    <ul>
                      <div
                        className="scroll-li"
                        style={{
                          width: "100%",
                          height: "100px",
                          overflowY: "scroll",
                        }}
                      >
                        <li className="text-left">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Dhanush"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>

                        <li>
                          <Chip
                            avatar={<Avatar>G</Avatar>}
                            label="Gokul"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2"
                          />
                        </li>
                      </div>
                    </ul>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  CLOSE
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iframe;
