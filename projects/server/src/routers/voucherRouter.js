const voucherRouter = require("express").Router();
const { voucherController } = require("../controllers");

voucherRouter.get("/", voucherController.getVouchers);
voucherRouter.post("/", voucherController.createVoucher);
voucherRouter.put("/:id", voucherController.updateVoucher);
voucherRouter.delete("/:id", voucherController.deleteVoucher);

module.exports = voucherRouter;
