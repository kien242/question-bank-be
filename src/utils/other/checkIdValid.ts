import { Types } from 'mongoose';
import { ForbiddenError } from '../core/error.res';
import { logError } from '../consoleLog/consoleColors';

const checkIdValid = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    logError('UserId is not a valid');
    throw new ForbiddenError('UserId is not a valid');
  }
  return true;
};
export { checkIdValid };
