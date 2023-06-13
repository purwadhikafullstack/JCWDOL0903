const voucherRouter = require("express").Router();
const { voucherController } = require("../controllers");

voucherRouter.get("/", voucherController.getVouchers);

module.exports = voucherRouter;
