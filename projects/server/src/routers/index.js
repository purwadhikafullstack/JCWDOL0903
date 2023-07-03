const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const authRouter = require("./authRouters");
const profillingRouter = require("./profilingRouter");
const voucherRouter = require("./voucherRouter");
const branchRouter = require("./branchRouter");
const changePassRouter = require("./changePassRouter");
const cartRouter = require("./cartRouters");
const rajaOngkirRouter = require("./rajaOngkirRouters");
const stockRouter = require("./stockRouter");
const adminRouter = require("./adminRouter");
const transactionHeaderRouter = require("./TransactionHeaderRouter");

module.exports = {
  productRouter,
  categoryRouter,
  profillingRouter,
  authRouter,
  voucherRouter,
  branchRouter,
  changePassRouter,
  cartRouter,
  rajaOngkirRouter,
  stockRouter,
  branchRouter,
  adminRouter,
  transactionHeaderRouter,
};
