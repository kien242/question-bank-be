const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { UserService } = require('../../service/profile/user.js');
const { logWarn } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');

// Dùng để check role, pass với duy nhất role truyền vào
const checkAbsoluteRole = (role) => {
  return async (req, res, next) => {
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const foundUser = await UserService.findUserById(userId);
    if (foundUser.role !== role) {
      logWarn('User is not have role');
      throw new ForbiddenError('User is not have role');
    }
    return next();
  };
};

// Dùng để check role, pass với tất cả các role có độ ưu tiên lớn hơn role truyền vào
const checkRelativeRole = (role) => {
  return async (req, res, next) => {
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const foundUser = await UserService.findUserById(userId);
    if (foundUser.role > role) {
      logWarn('User is not have role');
      throw new ForbiddenError('User is not have role');
    }
    return next();
  };
};

const checkRole =
  (...role) =>
  async (req, res, next) => {
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const foundUser = await UserService.findUserById(userId);
    if (foundUser && !role.includes(foundUser.role)) {
      logWarn('User is not have role');
      throw new ForbiddenError('User is not have role');
    }
    return next();
  };
module.exports = { checkAbsoluteRole, checkRelativeRole, checkRole };
