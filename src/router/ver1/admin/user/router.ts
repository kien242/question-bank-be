import { Router } from 'express';
import { AdminController } from '../../../../controller/admin.user';
import { asyncHandle } from '../../../../utils/asyncHandle';

const user = Router();

user.get('/', asyncHandle(AdminController.getUserProfile));
user.delete('/', asyncHandle(AdminController.deleteUser));
user.put('/', asyncHandle(AdminController.updateUser));

export default user;
