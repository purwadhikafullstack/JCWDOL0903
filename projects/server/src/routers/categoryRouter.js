const categoryRouter = require("express").Router();
const { categoryController } = require("../controllers");

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
