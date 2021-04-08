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
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DialogContentText from "@material-ui/core/DialogContentText";
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
  const [openDownload, setOpenDownload] = React.useState(false);
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const confirmDownload = () => {
    handleClose();
    props.snackBar("Video downloading...", "info")
    const url = `http://localhost:5000/video/download/${props.currentVideo.videoId}`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${props.currentVideo.title}.mp4`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        props.snackBar("Video downloaded Successfully", "success")
      });
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDownload(false);
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
    const { data, flag } = await res.json();
    props.snackBar(
      flag ? "Added to favorties" : "Removed from favorites",
      flag ? "success" : "error"
    );
    props.setFavorites(data);
  };
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
        src={`https://www.youtube-nocookie.com/embed/${props.currentVideo.videoId}?autoplay=1&enablejsapi=1&rel=0&showinfo=0`}
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

            <div className="content download">
              <div className="icon">
                <svg
                  className="download"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25%"
                  height="25%"
                  viewBox="0 0 14 17"
                  onClick={() => setOpenDownload(true)}
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
                <Dialog
                  open={openDownload}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Do you want to Download this Video?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <span className="badge badge-info mr-2">
                        {props.currentVideo.channelTitle}
                      </span>
                      <span className="badge badge-success w-auto">
                        {props.currentVideo.description}
                      </span>
                      <h4 className="mt-2">{props.currentVideo.title}</h4>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="primary"
                      onClick={confirmDownload}
                      startIcon={<DoneAllIcon />}
                      autoFocus
                    >
                      Yes
                    </Button>
                    <Button
                      startIcon={<CloseOutlinedIcon />}
                      onClick={handleClose}
                      color="secondary"
                      autoFocus
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
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
                        className="scroll-li d-flex flex-wrap"
                        style={{
                          width: "100%",
                          height: "100px",
                          overflowY: "scroll",
                        }}
                      >
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Dhanush"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Gajendriran"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Gobinath"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Nandha"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Dhusandhan"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Vasanthan"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>
                        <li className="mx-1">
                          <Chip
                            avatar={<Avatar>D</Avatar>}
                            label="Dhanush"
                            clickable
                            color="primary"
                            onClick={handleClick}
                            className="mb-2 "
                          />
                        </li>

                        <li className="mx-1">
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
