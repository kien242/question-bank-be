const { UserService } = require('../../service/profile/user.js');
const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');

const UserController = {
  getCurrentUserInfo: async (req, res) => {
    logInfo('[User]::getCurrentUserInfo');
    new OK({
      message: 'Get current user information successfully',
      metadata: await UserService.getCurrentUserInfo(req),
    }).send(res);
  },
  updateCurrentUser: async (req, res) => {
    logInfo('[User]::updateCurrentUser');
    new OK({
      message: 'Update current user information successfully',
      metadata: await UserService.updateCurrentUser(req),
    }).send(res);
  },
};

module.exports = { UserController };
