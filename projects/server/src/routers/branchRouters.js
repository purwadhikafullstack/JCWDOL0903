const Router = require("express").Router();
const { branchControllers } = require("../controllers");

Router.get("/", branchControllers.getBranch);
Router.post("/", branchControllers.createBranch)

module.exports = Router;