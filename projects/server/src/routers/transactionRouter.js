const transactionRouter = require("express").Router();
const { transactionController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

transactionRouter.patch(
  "/:id",
  userExtractor,
  transactionController.updateTransaction
);

transactionRouter.post("/create_transaction/:id", transactionController.createTransaction)
transactionRouter.get("/get_transaction/:id", transactionController.getTransactionHead)
transactionRouter.post("/get_transactions", transactionController.getTransactionHeaders)
transactionRouter.patch("/coba_aja", transactionController.updateTransaction)
transactionRouter.patch("/update_transaction/confirm/:id",transactionController.confirmTransaction)

module.exports = transactionRouter;
