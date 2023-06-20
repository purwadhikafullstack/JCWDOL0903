const productController = require("./ProductController");
const categoryController = require("./categoryController");
const authControllers = require("./authControllers");
const profillingControllers = require("./profillingControler");
const voucherController = require("./voucherController");
const branchControllers = require("./branchController")
const addressControllers = require("./addressControllers")

module.exports = {
  productController,
  categoryController,
  authControllers,
  profillingControllers,
  voucherController,
  branchControllers,
  addressControllers
};
