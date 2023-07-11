const transactionRouter = require("express").Router();
const { transactionController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

transactionRouter.patch(
  "/:id",
  userExtractor,
  transactionController.updateTransaction
);

transactionRouter.post(
  "/create_transaction/:id",
  transactionController.createTransaction
);

transactionRouter.get(
  "/get_transaction/:id",
  transactionController.getTransactionHead
);

module.exports = transactionRouter;
