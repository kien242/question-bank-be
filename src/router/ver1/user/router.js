const { Router } = require("express");
const { UserController } = require("#controller/user.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { validateReq } = require("#middleware/validate/validate.js");
const { userReqSch } = require("#middleware/validate/joiSchema.js");
const { checkAbsoluteRole, checkRole } = require("#middleware/check/checkRole.js");
const { ROLE } = require("#config/database/userRole.js");

const userRouter = Router();
userRouter.get("/", asyncHandle(UserController.getCurrentUserInfo));
userRouter.put("/", asyncHandle(UserController.updateCurrentUser));

userRouter.use(
	"/admin",
	// asyncHandle(checkAbsoluteRole(ROLE.ADMIN)),
	asyncHandle(checkRole(ROLE.ADMIN)),
	require("#router/ver1/user/admin/router.js"),
);
module.exports = userRouter;
