const { ACTIVE_STATUS } = require('../../config/database/user/activeStatus.js');
const { HEADER } = require('../../config/header.js');
const { userModel } = require('../../model/access/user/model.js');
const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');

const checkActive = async (req, res, next) => {
  const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
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
module.exports = { checkActive };
