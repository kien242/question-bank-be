const { Router } = require('express');
const { asyncHandle } = require('#utils/asyncHandle/index.js');
const { AdminController } = require('#controller/admin.js');

// eslint-disable-next-line new-cap
const adminRouter = Router();

adminRouter.get('/user', asyncHandle(AdminController.getUserProfile));
adminRouter.delete('/user', asyncHandle(AdminController.deleteUser));

module.exports = adminRouter;
