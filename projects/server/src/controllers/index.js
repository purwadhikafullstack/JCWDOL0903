const productController = require("./productController");
const categoryController = require("./categoryController");
const authControllers = require("./authControllers");
const profillingControllers = require("./profillingControler");
const voucherController = require("./voucherController");
const branchControllers = require("./branchController");
const cartControllers = require("./cartControllers");
const stockController = require("./stockController");
const rajaOngkirControllers = require("./rajaOngkirController");
const userVoucherController = require("./userVoucherController");
const transactionController = require("./transactionController");
const transactionDetailsController = require("./transactionDetails")

module.exports = {
  productController,
  categoryController,
  authControllers,
  profillingControllers,
  voucherController,
  branchControllers,
  cartControllers,
  rajaOngkirControllers,
  stockController,
  userVoucherController,
  transactionController,
  transactionDetailsController
};
