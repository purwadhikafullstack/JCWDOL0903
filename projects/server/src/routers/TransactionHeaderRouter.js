const transactionHeaderController = require("../controllers/transactionHeaderControllers");
const router = require("express").Router();

router.get("/:id", transactionHeaderController.fetchTransactionHeader);

module.exports = router;
