import { Router } from 'express';
import { specs } from '../../../docs/ver1/setupDocs';
import { serve, setup } from 'swagger-ui-express';
import { ROLE } from '../../../src/config/database/userRole';
import { asyncHandle } from '../../../src/utils/asyncHandle/index';
import { checkAuth } from '../../../src/middleware/check/checkAuth';
import { checkRole } from '../../../src/middleware/check/checkRole';
import accessRouter from '../../../src/router/ver1/access/router';
import userRouter from '../../../src/router/ver1/user/router';
import adminRouter from '../../../src/router/ver1/admin/router';

const ver1 = Router();

ver1.use('/docs', serve, setup(specs));

ver1.use('/access', accessRouter);
ver1.use(asyncHandle(checkAuth));
ver1.use('/user', userRouter);
ver1.use('/admin', asyncHandle(checkRole(ROLE.ADMIN)), adminRouter);
export default ver1;
