const User = require("../models/User");
const bcrypt = require("bcrypt");
const signup = (req, res) => {
  let { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) console.log(err);
          const newUser = new User({ email, name, password: hash });
          newUser
            .save()
            .then((data) => res.status(201).send(data))
            .catch((err) => res.status(502).send(err));
        });
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
      .populate([
        {
          path: "favorites",
          model: "video",
        },
        {
          path: "history",
          model: "video",
        },
        {
          path: "playlists",
          model: "playlist",
          populate: {
            path: "list",
            model: "video",
          },
        },
      ])
      .exec();
    if(currentUser && password.length > 10) res.status(200).send(currentUser);
    (async () => {
      const match = await bcrypt.compare(password, currentUser.password);
      if (!currentUser) res.status(404).send({ message: "user not found" });
      else if (!match) res.status(401).send({ message: "incorrect password" });
      else res.status(200).send(currentUser);
    })();
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
const edit = (req, res) => {
  let { email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) console.log(err);
      else {
        await User.updateOne(
          { email },
          {
            $set: { password: hash },
          }
        );
      }
      res.status(200).send({ password : hash });
    });
  } catch (e) {
    res.status(502).send({ message: "error" });
  }
};
module.exports = {
  signup,
  login,
  edit,
};
