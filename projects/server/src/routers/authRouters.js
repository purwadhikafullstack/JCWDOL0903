const { authControllers } = require("../controllers");
const { isVerify } = require("../controllers/authControllers");
const router = require("express").Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/verify", authControllers.verify);
router.get("/v1/:token", authControllers.getUserByToken);

module.exports = router;
