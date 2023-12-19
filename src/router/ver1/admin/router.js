const { Router } = require('express');
const adminRouter = Router();

adminRouter.use('/user', require('#router/ver1/admin/user/router.js'));

module.exports = adminRouter;
