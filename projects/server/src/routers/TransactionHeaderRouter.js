const transactionHeaderController = require("../controllers/transactionHeaderControllers");
const router = require("express").Router();
const { fileUploader } = require("../middleware/multer");

router.get("/:id", transactionHeaderController.fetchTransactionHeader);
router.patch("/user_payment/:id", fileUploader({destinationFolder:"transhead", prefix: "PAYIMG"}).single("user_payment"), transactionHeaderController.setTransImage)

module.exports = router;
