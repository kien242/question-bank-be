import { Router } from 'express';
import user from './user/router';

const adminRouter = Router();

adminRouter.use('/user', user);

export default adminRouter;
