import { Router } from 'express';
import { asyncHandle } from '../../../utils/asyncHandle';
import { validateReq } from '../../../middleware/validate/validate';
import { AccessController } from '../../../controller/access';
import { userReqSch } from '../../../middleware/validate/joiSchema';
import { checkAuth } from '../../../middleware/check/checkAuth';

const accessRouter = Router();

accessRouter.post(
  '/signup',
  asyncHandle(validateReq(userReqSch)),
  asyncHandle(AccessController.signUp)
);
accessRouter.post(
  '/login',
  asyncHandle(validateReq(userReqSch)),
  asyncHandle(AccessController.login)
);
accessRouter.get('/handle-refresh-token', asyncHandle(AccessController.handleRefreshToken));
accessRouter.delete('/logout', asyncHandle(checkAuth), asyncHandle(AccessController.logout));

accessRouter.get('/active', asyncHandle(AccessController.activeUser));
export default accessRouter;
