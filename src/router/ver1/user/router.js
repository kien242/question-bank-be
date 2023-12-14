const { Router } = require("express");
const { UserController } = require("#controller/user.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { validateReq } = require("#middleware/validate/validate.js");
const { userReqSch } = require("#middleware/validate/joiSchema.js");
const { checkAbsoluteRole } = require("#middleware/check/checkRole.js");
const { ROLE } = require("#config/database/userRole.js");

const userRouter = Router();
userRouter.get("/get-current-user-profile", asyncHandle(UserController.getCurrentUserInfo));
userRouter.put(
	"/update-current-user-profile",
	// asyncHandle(validateReq(userReqSch)),
	asyncHandle(UserController.updateCurrentUser),
);

userRouter.use(
	"/admin",
	asyncHandle(checkAbsoluteRole(ROLE.ADMIN)),
	require("#router/ver1/user/admin/router.js"),
);
module.exports = userRouter;
