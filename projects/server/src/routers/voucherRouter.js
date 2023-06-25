const voucherRouter = require("express").Router();
const { voucherController } = require("../controllers");

voucherRouter.get("/", voucherController.getVouchers);
voucherRouter.post("/", voucherController.createVoucher);
voucherRouter.patch("/:id", voucherController.updateVoucher);
voucherRouter.delete("/:id", voucherController.deleteVoucher);

module.exports = voucherRouter;
