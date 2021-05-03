const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
  title: { type: String },
  channelTitle: { type: String },
  description: { type: String },
  videoId: { type: String, required: true, unique: true },
  thumbnails: { type: String },
});

module.exports = model("video", videoSchema);
