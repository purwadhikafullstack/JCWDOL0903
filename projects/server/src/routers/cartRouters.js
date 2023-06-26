const Router = require("express").Router();
const { cartControllers } = require("../controllers");

Router.get("/:id", cartControllers.getCart);
Router.post("/get",cartControllers.getUserCart)
Router.post("/", cartControllers.addToCart);
Router.delete("/:id", cartControllers.reduceCartOne)
Router.delete("/item/:id", cartControllers.deleteCart)


module.exports = Router;