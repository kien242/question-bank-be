const { AdminController } = require("#controller/user.admin.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { Router } = require("express");

const adminRouter = Router();
adminRouter.get("/get-user-profile", asyncHandle(AdminController.getUserProfile));
module.exports = adminRouter;
