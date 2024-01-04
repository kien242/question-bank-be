const { REQ_CUSTOM_FILED } = require('../../../config/reqCustom.js');
const { asyncHandle } = require('../../../utils/asyncHandle/index.js');
const { checkAuth } = require('../../../middleware/check/checkAuth.js');
const { userReqSch } = require('../../../middleware/validate/joiSchema.js');
const { validateReq } = require('../../../middleware/validate/validate.js');
const { AccessController } = require('../../../controller/access/access.js');

const { Router } = require('express');

const accessRouter = Router();

accessRouter.post(
    '/signup',
    asyncHandle(validateReq(userReqSch, REQ_CUSTOM_FILED.USER_DATA)),
    asyncHandle(AccessController.signUp),
);
accessRouter.post(
    '/login',
    //   asyncHandle(validateReq(userReqSch)),
    asyncHandle(AccessController.login),
);
accessRouter.get('/handle-refresh-token', asyncHandle(AccessController.handleRefreshToken));
accessRouter.delete('/logout', asyncHandle(checkAuth), asyncHandle(AccessController.logout));

accessRouter.get('/active', asyncHandle(AccessController.activeUser));
accessRouter.get('/forward-password', asyncHandle(AccessController.forwardPassword)); // Quen mat khau
accessRouter.get('/new-password', asyncHandle(AccessController.newPasswordHtml));
accessRouter.post('/new-password', asyncHandle(AccessController.changePassword));

module.exports = accessRouter;
