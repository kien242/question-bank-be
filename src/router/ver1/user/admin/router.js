const { AdminController } = require("#controller/user.admin.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { Router } = require("express");

const adminRouter = Router();
adminRouter.get("/user", asyncHandle(AdminController.getUserProfile));
adminRouter.delete("/user", asyncHandle(AdminController.deleteUser));
module.exports = adminRouter;
