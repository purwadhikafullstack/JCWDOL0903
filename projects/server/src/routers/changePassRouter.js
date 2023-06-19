const ChangePassRouter = require("express").Router();
const changePassController = require("../controllers/changePassController");

ChangePassRouter.put("/changepassword/:id", changePassController.changePass);

module.exports = ChangePassRouter;
