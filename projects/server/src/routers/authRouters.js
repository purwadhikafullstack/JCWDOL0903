const { authControllers } = require("../controllers");
const router = require("express").Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/verify", authControllers.verify);
router.get("/v1/:token", authControllers.getUserByToken);
router.post("/verification/:id", authControllers.resendVerification);

// req token by email
router.patch("/forgot-password", authControllers.forgotPass);
router.post("/reset-password", authControllers.requestReset);
// router.patch("/getbytoken-forgotPass", authControllers.getByTokenForgotPass);
module.exports = router;
