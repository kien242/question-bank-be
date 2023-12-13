const { AccessController } = require("#controller/access.js");
const { checkAuth } = require("#middleware/check/checkAuth.js");
const { userReqSch } = require("#middleware/validate/joiSchema.js");
const { validateReq } = require("#middleware/validate/validate.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { Router } = require("express");

const accessRouter = Router();

accessRouter.post(
  "/signup",
  asyncHandle(validateReq(userReqSch)),
  asyncHandle(AccessController.signUp)
);
accessRouter.post(
  "/login",
  asyncHandle(validateReq(userReqSch)),
  asyncHandle(AccessController.login)
);

accessRouter.delete(
  "/logout",
  asyncHandle(checkAuth),
  asyncHandle(AccessController.logout)
);

accessRouter.get(
  "/handle-refresh-token",
  asyncHandle(AccessController.handleRefreshToken)
);

accessRouter.get("/active", asyncHandle(AccessController.activeUser));
module.exports = accessRouter;
