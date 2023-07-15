stockHistoryRouter = require("express").Router();
const { stockHistoryController } = require("../controllers");

stockHistoryRouter.get("/", stockHistoryController.fetchStockHistory);

module.exports = stockHistoryRouter;
