const { AdminServiceUser } = require('../service/admin.user.js');
const { logInfo } = require('../utils/consoleLog/consoleColors.js');
const { OK } = require('../utils/core/success.res.js');

const AdminController = {
  getUserProfile: async (req, res) => {
    logInfo('[admin]::getUserProfile');
    new OK({
      message: 'Get user profile successfully',
      metadata: await AdminServiceUser.getUserProfile(req),
    }).send(res);
  },
  deleteUser: async (req, res) => {
    logInfo('[admin]::deleteUser');
    new OK({
      message: 'Delete user successfully',
      metadata: await AdminServiceUser.deleteUser(req),
    }).send(res);
  },
  updateUser: async (req, res) => {
    logInfo('[admin]::updateUser');
    new OK({
      message: 'Update user successfully',
      metadata: await AdminServiceUser.updateUser(req),
    }).send(res);
  },
};

module.exports = { AdminController };
