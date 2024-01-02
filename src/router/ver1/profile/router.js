const { Router } = require('express');
const { asyncHandle } = require('../../../utils/asyncHandle/index.js');
const { UserController } = require('../../../controller/profile/user.js');

const userRouter = Router();

userRouter.get('/', asyncHandle(UserController.getCurrentUserInfo));
userRouter.put('/', asyncHandle(UserController.updateCurrentUser));

module.exports = userRouter;
