const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.ObjectId, ref: "Video", unique: false }],
  history: [{ type: Schema.ObjectId, ref: "Video", unique: false }],
});

module.exports = model("user", userSchema);
