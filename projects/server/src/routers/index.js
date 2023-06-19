const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const authRouter = require("./authRouters");
const profillingRouter = require("./profilingRouter");
const voucherRouter = require("./voucherRouter");
const branchRouter = require("./branchRouters")

module.exports = {
  productRouter,
  categoryRouter,
  profillingRouter,
  authRouter,
  voucherRouter,
  branchRouter
};
