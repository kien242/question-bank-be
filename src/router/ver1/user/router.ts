import { Router } from 'express';
import { UserController } from '../../../controller/user';
import { asyncHandle } from '../../../utils/asyncHandle';

const userRouter = Router();

userRouter.get('/', asyncHandle(UserController.getCurrentUserInfo));
userRouter.put('/', asyncHandle(UserController.updateCurrentUser));

export default userRouter;
