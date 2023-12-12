const { AccessController } = require("#controller/access.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { Router } = require("express");

const accessRouter = Router();

accessRouter.post("/signup", asyncHandle(AccessController.signUp));

module.exports = accessRouter;
