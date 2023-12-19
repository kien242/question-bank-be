import { AdminServiceUser } from '../service/admin.user';
import { logInfo } from '../utils/consoleLog/consoleColors';
import { OK } from '../utils/core/success.res';

const AdminController = {
  getUserProfile: async (req: Request, res: Response) => {
    logInfo('[admin]::getUserProfile');
    new OK({
      message: 'Get user profile successfully',
      metadata: await AdminServiceUser.getUserProfile(req),
    }).send(res);
  },
  deleteUser: async (req: Request, res: Response) => {
    logInfo('[admin]::deleteUser');
    new OK({
      message: 'Delete user successfully',
      metadata: await AdminServiceUser.deleteUser(req),
    }).send(res);
  },
  updateUser: async (req: Request, res: Response) => {
    logInfo('[admin]::updateUser');
    new OK({
      message: 'Update user successfully',
      metadata: await AdminServiceUser.updateUser(req),
    }).send(res);
  },
};

export { AdminController };
