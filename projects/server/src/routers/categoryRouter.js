const categoryRouter = require("express").Router();
const { categoryController } = require("../controllers");

categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;
