const Router = require("express").Router();
const { transactionControllers } = require("../controllers");

Router.post("/create_transaction/:id", transactionControllers.createTransaction)

module.exports = Router;