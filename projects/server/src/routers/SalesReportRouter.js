SalesReportRouter = require("express").Router();
const { salesReportController } = require("../controllers");

SalesReportRouter.get("/", salesReportController.fetchSalesReport);

module.exports = SalesReportRouter;
