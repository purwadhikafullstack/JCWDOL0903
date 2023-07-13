const categoryRouter = require("express").Router();
const { categoryController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", userExtractor, categoryController.createCategory);
categoryRouter.patch("/:id", userExtractor, categoryController.updateCategory);
categoryRouter.delete("/:id", userExtractor, categoryController.deleteCategory);

module.exports = categoryRouter;
