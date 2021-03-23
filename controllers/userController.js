const User = require("../models/User");
const Video = require("../models/Video");

const signup = (req, res) => {
  let { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUser = new User({ email, name, password });
        newUser
          .save()
          .then((data) => res.status(201).send(data))
          .catch((err) => res.status(502).send("error 1"));
      } else {
        res.status(403).send({ message: "User already exists" });
      }
    })
    .catch((err) => res.status(502).send("error 2"));
};
const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let currentUser = await User.findOne({ email })
      .populate({
        path: "favorites",
        model: "video",
      })
      .populate({
        path: "history",
        model: "video",
      })
      .exec();
    if (!currentUser) res.status(404).send({ message: "user not found" });
    else if (currentUser.password !== password)
      res.status(401).send({ message: "incorrect password" });
    else res.status(200).send(currentUser);
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
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
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { favorites: data._id },
      }).exec();
    }
    let favorite = await User.find({ email }).select("favorite").populate({
      path: "favorites",
      model: "video",
    });
    res.send(favorite[0].favorites);
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
module.exports = {
  signup,
  login,
  favorites,
  history,
  deleteVideo,
  clearHistory,
};
