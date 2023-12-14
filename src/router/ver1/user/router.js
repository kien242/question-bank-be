const { Router } = require("express");
const { UserController } = require("#controller/user.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { validateReq } = require("#middleware/validate/validate.js");
const { userReqSch } = require("#middleware/validate/joiSchema.js");

const userRouter = Router();
userRouter.get("/get-current-user-profile", asyncHandle(UserController.getCurrentUserInfo));
userRouter.put(
	"/update-current-user-profile",
	// asyncHandle(validateReq(userReqSch)),
	asyncHandle(UserController.updateCurrentUser),
);
module.exports = userRouter;
