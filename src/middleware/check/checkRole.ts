import { HEADER } from '../../../src/config/header';
import { UserService } from '../../../src/service/user';
import { logWarn } from '../../../src/utils/consoleLog/consoleColors';
import { ForbiddenError } from '../../../src/utils/core/error.res';

// Dùng để check role, pass với duy nhất role truyền vào
const checkAbsoluteRole = (role) => {
  return async (req, res, next) => {
    const userId = req.headers[HEADER.USER_ID];
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
    const userId = req.headers[HEADER.USER_ID];
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
    const userId = req.headers[HEADER.USER_ID];
    const foundUser = await UserService.findUserById(userId);
    if (foundUser && !role.includes(foundUser.role)) {
      logWarn('User is not have role');
      throw new ForbiddenError('User is not have role');
    }
    return next();
  };
export { checkAbsoluteRole, checkRelativeRole, checkRole };
