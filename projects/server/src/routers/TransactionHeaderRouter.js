const transactionHeaderController = require("../controllers/transactionHeaderControllers");
const router = require("express").Router();
const { fileUploader } = require("../middleware/multer");

router.get("/", transactionHeaderController.fetchTransactionHeader);
router.patch("/user_payment/:id", fileUploader({destinationFolder:"transhead", prefix: "PAYIMG"}).single("user_payment"), transactionHeaderController.setTransImage)
router.delete("/user_payment/delete", transactionHeaderController.deleteTransactionHeader)
router.patch("/user_payment/update", transactionHeaderController.confirmTransactionsAfter1D)


module.exports = router;
