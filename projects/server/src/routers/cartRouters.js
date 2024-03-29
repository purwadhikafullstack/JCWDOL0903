const Router = require("express").Router();
const { cartControllers } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");
const { checkUser } = require("../middleware/auth");

Router.get("/:id/:branch_id",checkUser, cartControllers.getCart);
Router.post("/users_voucher", cartControllers.getUsersVoucher)
Router.post("/get", cartControllers.getUserCart);
Router.post("/", userExtractor, cartControllers.addToCart);
Router.delete("/:id", cartControllers.reduceCartOne);
Router.delete("/item/:id", cartControllers.deleteCart);

module.exports = Router;