const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
  title: { type: String, required: true },
  channelTitle: { type: String, required: true },
  description: { type: String, required: true },
  videoId: { type: String, required: true, unique: true },
  thumbnails: { type: String, required: true },
});

module.exports = model("video", videoSchema);
