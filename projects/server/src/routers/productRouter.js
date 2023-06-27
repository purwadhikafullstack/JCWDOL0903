const productRouter = require("express").Router();
const { productController } = require("../controllers");
const { fileUploader } = require("../middleware/multer");

productRouter.get("/", productController.getProducts);
productRouter.post(
  "/",
  fileUploader({ destinationFolder: "products", prefix: "PIMG" }).single(
    "product_image"
  ),
  productController.createProduct
);
productRouter.patch(
  "/:id",
  fileUploader({ destinationFolder: "products", prefix: "PIMG" }).single(
    "product_image"
  ),
  productController.updateProduct
);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
