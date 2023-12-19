const { Router } = require('express');
const { UserController } = require('#controller/user.js');
const { asyncHandle } = require('#utils/asyncHandle/index.js');

const userRouter = Router();

userRouter.get('/', asyncHandle(UserController.getCurrentUserInfo));
userRouter.put('/', asyncHandle(UserController.updateCurrentUser));

module.exports = userRouter;
