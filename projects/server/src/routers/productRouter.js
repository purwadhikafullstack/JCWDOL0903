const productRouter = require("express").Router();
const { productController } = require("../controllers");

productRouter.get("/", productController.getProducts);

module.exports = productRouter;
