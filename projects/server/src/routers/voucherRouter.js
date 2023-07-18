const voucherRouter = require("express").Router();
const { voucherController, userVoucherController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

voucherRouter.get("/", voucherController.getVouchers);
voucherRouter.post("/users_voucher", userVoucherController.getUserVouchers)
voucherRouter.post("/", userExtractor, voucherController.createVoucher);
voucherRouter.patch("/:id", userExtractor, voucherController.updateVoucher);
voucherRouter.delete("/:id", userExtractor, voucherController.deleteVoucher);

module.exports = voucherRouter;
