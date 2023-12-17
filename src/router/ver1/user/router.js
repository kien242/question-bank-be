const {Router} = require('express');
const {UserController} = require('#controller/user.js');
const {asyncHandle} = require('#utils/asyncHandle/index.js');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.get('/', asyncHandle(UserController.getCurrentUserInfo));
userRouter.put('/', asyncHandle(UserController.updateCurrentUser));

module.exports = userRouter;
