const { Router } = require('express');
const adminRouter = Router();

adminRouter.use('/user', require('./user/router.js'));

module.exports = adminRouter;
