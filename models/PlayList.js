const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", unique: false },
  name: { type: String, required: true, unique: true },
  list: [{ type: Schema.ObjectId, ref: "Video", unique: false }],
});

module.exports = model("playlist", playlistSchema);
