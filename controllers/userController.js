const User = require("../models/User");
const Video = require("../models/Video");
const ytdl = require("ytdl-core");

const favorites = async (req, res) => {
  let {
    channelTitle,
    description,
    thumbnails,
    title,
    videoId,
    email,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    let data;
    let videos = await Video.find({});
    let currentVideo = videos.find((video) => video.videoId === videoId);
    let flag = false;
    if (!currentVideo) {
      const newVideo = new Video({
        channelTitle,
        description,
        thumbnails,
        title,
        videoId,
      });
      data = await newVideo.save();
    } else data = currentVideo;
    const userFav = user.favorites.find(
      (id) => JSON.stringify(data._id) === JSON.stringify(id)
    );
    if (!userFav) {
      await User.findByIdAndUpdate(user._id, {
        $push: { favorites: data._id },
      }).exec();
      flag = true;
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { favorites: data._id },
      }).exec();
      flag = false;
    }
    let favorite = await User.find({ email }).select("favorite").populate({
      path: "favorites",
      model: "video",
    });
    res.send({ data: favorite[0].favorites, flag });
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const history = async (req, res) => {
  let {
    channelTitle,
    description,
    thumbnails,
    title,
    videoId,
    email,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    let data;
    let videos = await Video.find({});
    let currentVideo = videos.find((video) => video.videoId === videoId);
    if (!currentVideo) {
      const newVideo = new Video({
        channelTitle,
        description,
        thumbnails,
        title,
        videoId,
      });
      data = await newVideo.save();
    } else data = currentVideo;
    const userHis = user.history.find(
      (id) => JSON.stringify(data._id) === JSON.stringify(id)
    );
    if (!userHis) {
      await User.findByIdAndUpdate(user._id, {
        $push: {
          history: {
            $each: [data._id],
            $position: 0,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(
        user._id,
        {
          $pull: { history: data._id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(user._id, {
        $push: {
          history: {
            $each: [data._id],
            $position: 0,
          },
        },
      });
    }
    let history = await User.find({ email }).select("history").populate({
      path: "history",
      model: "video",
    });
    res.send(history[0].history);
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const deleteVideo = async (req, res) => {
  const { email, videoId } = req.body;
  try {
    let videos = await Video.find({});
    let currentVideo = videos.find((video) => video.videoId === videoId);
    await User.findOneAndUpdate(
      { email },
      {
        $pull: { history: currentVideo._id },
      },
      { new: true }
    );
    let history = await User.find({ email }).select("history").populate({
      path: "history",
      model: "video",
    });
    res.send(history[0].history);
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const clearHistory = async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne(
      { email },
      {
        $set: { history: [] },
      }
    );
    res.status(200).send("success");
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const downloadVideo = (req, res) => {
  const id = req.params.id;
  const url = `https://www.youtube.com/watch?v=${id}`;
  res.header("Content-Disposition", 'attachment;  filename="Video.mp4');
  ytdl(url, { format: "mp4" }).pipe(res);
};
module.exports = {
  favorites,
  history,
  deleteVideo,
  clearHistory,
  downloadVideo,
};
