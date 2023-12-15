const { Router } = require("express");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { AdminController } = require("#controller/user.admin.js");

const adminRouter = Router();

adminRouter.get("/user", asyncHandle(AdminController.getUserProfile));
adminRouter.delete("/user", asyncHandle(AdminController.deleteUser));

module.exports = adminRouter;
