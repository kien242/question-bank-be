const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');

const validateReq = (schema, field) => {
  return async (req, res, next) => {
    const object = req.body[field];

    try {
      await schema.validateAsync(object);
      next();
    } catch (error) {
      logError('Validation error');
      throw new ForbiddenError(error.message);
    }
  };
};

module.exports = { validateReq };
