const { signup, login, favorites, history } = require("../controllers/userController")

const router = require("express").Router()

router.post("/signup", signup)
router.post("/login", login)
router.patch("/video/:id/favorite", favorites);
router.patch("/video/:id/history", history);
module.exports = router