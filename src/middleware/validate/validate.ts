import { REQ_CUSTOM_FILED } from '../../../src/config/reqCustom';
import { logError } from '../../../src/utils/consoleLog/consoleColors';
import { ForbiddenError } from '../../../src/utils/core/error.res';

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

export { validateReq };
