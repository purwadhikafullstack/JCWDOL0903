const productRouter = require("express").Router();
const { productController } = require("../controllers");
const { fileUploader } = require("../middleware/multer");
const userExtractor = require("../middleware/userExtractor");

productRouter.get("/", productController.getProducts);
productRouter.post(
  "/",
  userExtractor,
  fileUploader({ destinationFolder: "products", prefix: "PIMG" }).single(
    "product_image"
  ),
  productController.createProduct
);
productRouter.patch(
  "/:id",
  userExtractor,
  fileUploader({ destinationFolder: "products", prefix: "PIMG" }).single(
    "product_image"
  ),
  productController.updateProduct
);
productRouter.delete("/:id", userExtractor, productController.deleteProduct);

module.exports = productRouter;
