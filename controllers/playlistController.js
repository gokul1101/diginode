const User = require("../models/User");
const Video = require("../models/Video");
const PlayList = require("../models/PlayList");
const createPlaylist = async (req, res) => {
  const { email, playlistName, videoId } = req.body;
  try {
    let user = await User.findOne({ email });
    let video = await Video.findOne({ videoId });
    let name = playlistName.replace(
      /(^\w|\s\w)(\S*)/g,
      (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    );
    let playlist = await PlayList.findOne({ name });
    if (!playlist) {
      let newPlaylist = new PlayList({
        user: user._id,
        name,
        list: [video._id],
      })
      await newPlaylist.save();
      await User.findByIdAndUpdate(user._id, {
        $push: { playlists: newPlaylist._id },
      }).exec();
      newPlaylist = await PlayList.find({ _id: newPlaylist._id }).populate({
        path: "list",
        model: "video",
      });
      res.status(201).send(newPlaylist);
    } else res.status(403).send("playlist already exists");
  } catch (e) {
    console.log(e)
    res.status(502).send({ message: "error" });
  }
};
const addToPlaylist = async (req, res) => {
  const { playlistName, videoId } = req.body;
  try {
    let video = await Video.findOne({ videoId });
    let playlist = await PlayList.findOne({ name: playlistName });
    let playlistVideo = playlist.list.find(
      (id) => JSON.stringify(video._id) === JSON.stringify(id)
    );
    if (!playlistVideo) {
      await PlayList.findByIdAndUpdate(playlist._id, {
        $push: { list: video._id },
      }).exec();
      let playlists = await PlayList.find({ _id: playlist._id }).populate({
        path: "list",
        model: "video",
      });
      res.status(200).send(playlists);
    } else res.status(403).send("Video is already in the playlist");
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const removeFromPlaylist = async (req, res) => {
  const { playlistName, videoId } = req.body;
  try {
    let video = await Video.findOne({ videoId });
    let playlist = await PlayList.findOne({ name: playlistName });
    let playlistVideo = playlist.list.find(
      (id) => JSON.stringify(video._id) === JSON.stringify(id)
    );
    if (playlistVideo) {
      await PlayList.findByIdAndUpdate(playlist._id, {
        $pull: { list: video._id },
      }).exec();
      let playlists = await PlayList.find({ _id: playlist._id }).populate({
        path: "list",
        model: "video",
      });
      res.status(200).send(playlists);
    } else res.status(403).send("Video is not in the playlist");
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const deletePlaylist = async (req, res) => {
  const { email, playlistName } = req.body;
  try {
    let user = await User.findOne({ email });
    let playlist = await PlayList.findOne({ name: playlistName });
    if (playlist) {
      await PlayList.findByIdAndDelete({ _id: playlist._id }).exec();
      res.status(200).send("removed from playlist");
    } else res.status(403).send("playlist already removed");
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
module.exports = {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
};
