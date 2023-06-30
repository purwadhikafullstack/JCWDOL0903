const userVoucherRouter = require("express").Router();
const { userVoucherController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

userVoucherRouter.get("/", userVoucherController.getUserVouchers);
userVoucherRouter.post(
  "/",
  userExtractor,
  userVoucherController.createUserVoucher
);

module.exports = userVoucherRouter;
