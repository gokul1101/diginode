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
      } else{
        res.status(403).send({ message: "User already exists" });
      }
    })
    .catch((err) => res.status(502).send("error 2"));
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let users = await User.find({});
    let currentUser = users.find((user) => user.email === email);
    if (!currentUser) res.status(404).send({ message: "user not found" });
    else if (currentUser.password !== password)
      res.status(401).send({ message: "incorrect password" });
    else res.status(200).send(currentUser);
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const favorites = async (req, res) => {
  let videoId = req.params.id;
  try{
    let video = await Video.findOne({videoId});
    if(!video)  {

    }
    console.log(video);
    res.send(videoId);
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
}
module.exports = { signup, login, favorites };
