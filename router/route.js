const { signup, login, favorites } = require("../controllers/userController")

const router = require("express").Router()

router.post("/signup", signup)
router.post("/login", login)
router.patch("/video/:id", favorites);
module.exports = router