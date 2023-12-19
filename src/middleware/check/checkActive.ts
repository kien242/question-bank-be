import { ACTIVE_STATUS } from '../../../src/config/database/activeStatus';
import { HEADER } from '../../../src/config/header';
import { userModel } from '../../../src/model/access/user/model';
import { logInfo } from '../../../src/utils/consoleLog/consoleColors';
import { ForbiddenError } from '../../../src/utils/core/error.res';

const checkActive = async (req, res, next) => {
  const userId = req.headers[HEADER.USER_ID];
  const foundUser = await userModel.findOne({ _id: userId });
  switch (foundUser.status) {
    case ACTIVE_STATUS.INACTIVE:
      logInfo('User is not active!! Please activate');
      throw new ForbiddenError('User is not active');
    case ACTIVE_STATUS.LOCKER:
      logInfo('User is locked');
      throw new ForbiddenError('User is locked');
  }
  return next();
};
export { checkActive };
