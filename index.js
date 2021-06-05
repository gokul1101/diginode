const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var corsOptions = {
  origin: 'https://diginode.herokuapp.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const { MONGOURI } = require("./config/index");
mongoose.connect(
  MONGOURI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to DB")
);

const router = require("./router/route");
app.use(router);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log("Connected to port " + PORT));
