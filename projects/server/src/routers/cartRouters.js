const Router = require("express").Router();
const { cartControllers } = require("../controllers");
const { checkUser } = require("../middleware/auth");

Router.get("/:id", checkUser, cartControllers.getCart);
Router.post("/get", cartControllers.getUserCart);
Router.post("/", cartControllers.addToCart);
Router.delete("/:id", cartControllers.reduceCartOne);
Router.delete("/item/:id", cartControllers.deleteCart);

module.exports = Router;
