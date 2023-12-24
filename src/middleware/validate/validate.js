const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');

const validateReq = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body[REQ_CUSTOM_FILED.USER_DATA]);
      next();
    } catch (error) {
      logError('Validation error');
      throw new ForbiddenError(error.message);
    }
  };
};

module.exports = { validateReq };
