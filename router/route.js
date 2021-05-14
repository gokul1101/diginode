const {
  favorites,
  history,
  deleteVideo,
  clearHistory,
  downloadVideo,
} = require("../controllers/userController");
const { signup, login, edit } = require("../controllers/loginController");
const {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist
} = require("../controllers/playlistController");

const router = require("express").Router();

router.get("/video/download/:id", downloadVideo);
router.post("/signup", signup);
router.post("/login", login);
router.post("/createPlaylist", createPlaylist);
router.delete("/deletePlaylist", deletePlaylist);
router.patch("/edit", edit);
router.patch("/addToPlaylist", addToPlaylist);
router.patch("/removeFromPlaylist", removeFromPlaylist);
router.patch("/video/:id/favorite", favorites);
router.patch("/video/:id/history", history);
router.patch("/video/:id/delete", deleteVideo);
router.patch("/video/clearHistory", clearHistory);
module.exports = router;
