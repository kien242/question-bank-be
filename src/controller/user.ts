import { UserService } from '../service/user';
import { logInfo } from '../utils/consoleLog/consoleColors';
import { OK } from '../utils/core/success.res';

const UserController = {
  getCurrentUserInfo: async (req: Request, res: Response) => {
    logInfo('[User]::getCurrentUserInfo');
    new OK({
      message: 'Get current user information successfully',
      metadata: await UserService.getCurrentUserInfo(req),
    }).send(res);
  },
  updateCurrentUser: async (req: Request, res: Response) => {
    logInfo('[User]::updateCurrentUser');
    new OK({
      message: 'Update current user information successfully',
      metadata: await UserService.updateCurrentUser(req),
    }).send(res);
  },
};

export { UserController };
