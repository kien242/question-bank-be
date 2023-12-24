const { AccessService } = require('../service/access.js');
const { logInfo } = require('../utils/consoleLog/consoleColors.js');
const { CREATE, OK } = require('../utils/core/success.res.js');

const AccessController = {
  signUp: async (req, res) => {
    logInfo('[Access]::signUp');
    new CREATE({
      message: 'Create a new user',
      metadata: await AccessService.signUp(req),
    }).send(res);
  },
  login: async (req, res) => {
    logInfo('[Access]::login');
    new OK({
      message: 'Login successfully',
      metadata: await AccessService.login(req),
    }).send(res);
  },
  logout: async (req, res) => {
    logInfo('[Access]::logout');
    new OK({
      message: 'Logout successfully',
      metadata: await AccessService.logout(req),
    }).send(res);
  },
  activeUser: async (req, res) => {
    logInfo('[Access]::activeUser');
    new OK({
      message: 'Active user successfully',
      metadata: await AccessService.activeUser(req),
    }).send(res);
  },
  handleRefreshToken: async (req, res) => {
    logInfo('[Access]::handleRefreshToken');
    new OK({
      message: 'Get token successfully',
      metadata: await AccessService.handleRefreshToken(req),
    }).send(res);
  },
};
module.exports = { AccessController };
