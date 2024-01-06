const { QUERY } = require('../../config/customQuery.js');
const { HEADER } = require('../../config/header.js');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { activeModel } = require('../../model/access/token/activeTokens/model.js');
const { AccessService } = require('../../service/access/access.js');
const { logInfo, logError } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');
const { CREATE, OK } = require('../../utils/core/success.res.js');
const JWT = require('jsonwebtoken');

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
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    new OK({
      message: 'Logout successfully',
      metadata: await AccessService.logout(userId),
    }).send(res);
  },
  activeUser: async (req, res) => {
    const userId = req.query[QUERY.USER_ID];
    const activeToken = req.query[QUERY.TOKEN];
    logInfo('[Access]::activeUser');
    new OK({
      message: 'Active user successfully',
      metadata: await AccessService.activeUser(userId, activeToken),
    }).send(res);
  },
  handleRefreshToken: async (req, res) => {
    const refreshTokenRaw = req.headers[HEADER.JWT_TOKEN];
    const refreshToken = refreshTokenRaw.split(' ')[1];
    const { userId } = JWT.decode(refreshToken);
    logInfo('[Access]::handleRefreshToken');
    new OK({
      message: 'Get token successfully',
      metadata: await AccessService.handleRefreshToken(userId, refreshToken),
    }).send(res);
  },
  forwardPassword: async (req, res) => {
    logInfo('[Access]::Forward Password');
    const { email, userName } = req.body[REQ_CUSTOM_FILED.USER_DATA];
    new OK({
      message: 'Restart password successfully',
      metadata: await AccessService.forwardPassword(email, userName),
    }).send(res);
  },
  newPasswordHtml: async (req, res) => {
    const userId = req.query[QUERY.USER_ID];
    const token = req.query[QUERY.TOKEN];
    const findToken = await activeModel.findOne({ userId });
    if (!findToken) {
      logError('User Id or token is not correct');
      throw new ForbiddenError('User Id or token is not correct');
    }
    if (findToken.forwardPasswordToken !== token) {
      logError('Active token failed, or user is active');
      throw new ForbiddenError('Active token failed');
    }
    res.render('newPassword', { title: userId });
  },
  changePassword: async (req, res) => {
    logInfo('[Access]::changePassword');
    const userId = req.query[QUERY.USER_ID];
    const { newPassword } = req.body;
    new OK({
      message: 'Password changed',
      metadata: await AccessService.changePassword(userId, newPassword),
    }).send(res);
  },
};

module.exports = { AccessController };
