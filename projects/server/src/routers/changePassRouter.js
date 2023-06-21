const changePassRouter = require("express").Router();
const changePassController = require("../controllers/changePassController");

changePassRouter.put("/changepassword/:id", changePassController.changePass);

module.exports = changePassRouter;
