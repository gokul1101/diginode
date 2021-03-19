import React, { useEffect, useState } from "react";
import VideoContainer from "../VideoContainer/VideoContainer";
import "./Favorite.css";

const Favorite = (props) => {
  const [favorites, setFavorites] = useState(Object.keys(props.user).length === 0?[]: props.user.favorites);
  // const getData = async () => {
  //   if (Object.keys(props.user).length === 0) {
  //     const res = await fetch(`http://localhost:5000/video/${propsvideoId}/favorite`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: localStorage.getItem("user"),
  //         channelTitle: vid.channelTitle,
  //         description : vid.description,
  //         thumbnails: vid.thumbnails,
  //         title: vid.title,
  //         videoId,
  //       }),
  //     });
  //     const data = await res.json();
  //     setHistory(data);
  //   }
  // }
  const onloadFrame = (e) => {
    let videoId = e.currentTarget.id;
    props.setCurrentVideo(props.user.favorites.find((data) => data.videoId === videoId));
    props.setToggle(true);
  };
  // useEffect(() => {
  //   getData()
  // })
  return (
    <>
      {console.log(favorites)}
      <VideoContainer onloadFrame={onloadFrame} fetchData={favorites}/>
    </>
  );
};

export default Favorite;
