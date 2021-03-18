const { signup, login, favorites, history, deleteVideo, clearHistory } = require("../controllers/userController")

const router = require("express").Router()

router.post("/signup", signup)
router.post("/login", login)
router.patch("/video/:id/favorite", favorites);
router.patch("/video/:id/history", history);
router.patch("/video/:id/delete", deleteVideo);
router.patch("/video/clearHistory", clearHistory);
module.exports = router