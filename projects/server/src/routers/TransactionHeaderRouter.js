const transactionHeaderController = require("../controllers/transactionHeaderControllers");
const router = require("express").Router();

router.get("/", transactionHeaderController.fetchTransactionHeader);

module.exports = router;
