const adminController = require("../controllers/adminControllers");

const adminRouter = require("express").Router();

adminRouter.get("/", adminController.getAllBranch);
adminRouter.get("/fetchbranchadmin", adminController.fetchAllAdminBranch);
adminRouter.post("/branchAdmin", adminController.addBranchAdmin);

module.exports = adminRouter;
