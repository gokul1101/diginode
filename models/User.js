const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  history: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

module.exports = model("user", userSchema);
