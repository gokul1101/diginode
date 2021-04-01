import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Main.css";
import Iframe from "./Iframe/Iframe";
// import { Button, colors, TextField } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import FormatIndentDecreaseOutlinedIcon from "@material-ui/icons/FormatIndentDecreaseOutlined";
// import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
// import Avatar from "@material-ui/core/Avatar";
// import Chip from "@material-ui/core/Chip";
// import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
// import { IconButton } from "@material-ui/core";
const Main = (props) => {
  // const useStyles = makeStyles((theme) => ({
  //   button: {
  //     margin: theme.spacing(1),
  //     border: "1px solid cyan",
  //     color: "cyan",
  //   },
  //   root: {
  //     display: "flex",
  //     justifyContent: "center",
  //     flexWrap: "wrap",
  //     "& > *": {
  //       margin: theme.spacing(0.5),
  //     },
  //   },
  // }));
  // const classes = useStyles();
  const [favorites, setFavorites] = useState(
    Object.keys(props.user).length === 0 ? [] : props.user.favorites
  );
  const [toggle, setToggle] = useState(false);
  const [currentVideo, setCurrentVideo] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const handleClick = () => {
    alert("clicked");
  };
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
        setCurrentVideo={setCurrentVideo}
      />
      {toggle ? (
        // <div className="playlist-overlay d-flex flex-column align-items-center">
        //   <IconButton
        //     className="close-btn position-absolute"
        //     aria-label="delete"
        //     style={{ color: "white" }}
        //   >
        //     <CloseOutlinedIcon />
        //   </IconButton>
        //   <div className="d-flex align-items-center justify-content-center mt-3">
        //     <Button
        //       variant="outlined"
        //       className={classes.button}
        //       endIcon={<AddCircleOutlinedIcon />}
        //       onClick={() => {
        //         setCreatePlaylist(false);
        //       }}
        //     >
        //       ADD PLAYLIST
        //     </Button>
        //     <Button
        //       variant="outlined"
        //       className={classes.button}
        //       endIcon={<FormatIndentDecreaseOutlinedIcon />}
        //       onClick={() => {
        //         setCreatePlaylist(true);
        //       }}
        //     >
        //       CREATE PLAYLIST
        //     </Button>
        //   </div>
        //   <div className="li-overlay mt-3">
        //     {createPlaylist ? (
        //       <div className="d-flex">
        //         <input
        //           className="p-2 mr-3"
        //           placeholder="Name of the playlist"
        //           style={{
        //             color: "white",
        //             background: "rgba(255, 255, 255, 0.09)",
        //             border: "none",
        //             borderRadius: "10px",
        //           }}
        //         />
        //         <Button
        //           size="small"
        //           variant="contained"
        //           color="secondary"
        //           endIcon={<AddCircleOutlinedIcon />}
        //         >
        //           ADD
        //         </Button>
        //       </div>
        //     ) : (
        //       <ul>
        //         <li>
        //           <Chip
        //             avatar={<Avatar>D</Avatar>}
        //             label="Dhanush"
        //             clickable
        //             color="primary"
        //             onClick={handleClick}
        //             className="mb-2"
        //           />
        //         </li>
        //         <li>
        //           <Chip
        //             avatar={<Avatar>G</Avatar>}
        //             label="Gokul"
        //             clickable
        //             color="primary"
        //             onClick={handleClick}
        //             className="mb-2"
        //           />
        //         </li>
        //       </ul>
        //     )}
        //   </div>
        // </div>
        <Iframe
          setToggle={setToggle}
          favorites={favorites}
          setFavorites={setFavorites}
          currentVideo={currentVideo}
        />
      ) : null}
    </div>
  );
};

export default Main;
