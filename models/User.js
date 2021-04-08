const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  playlists: [{ type: Schema.ObjectId, ref: "PlayList", unique: true }],
  favorites: [{ type: Schema.ObjectId, ref: "Video", unique: true }],
  history: [{ type: Schema.ObjectId, ref: "Video", unique: true }],
});

module.exports = model("user", userSchema);
