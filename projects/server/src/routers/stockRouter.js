const stockRouter = require("express").Router();
const { stockController } = require("../controllers");

stockRouter.get("/", stockController.getStocks);
stockRouter.post("/", stockController.createStock);
stockRouter.patch("/:id", stockController.updateStock);

module.exports = stockRouter;
