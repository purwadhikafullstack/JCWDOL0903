const Router = require("express").Router();
const { transactionDetailsController } = require("../controllers");

Router.get("/transdet/:head",transactionDetailsController.fetchTransactionDetails)

module.exports = Router;