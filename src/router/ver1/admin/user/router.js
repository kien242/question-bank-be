const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { AdminController } = require('../../../../controller/admin.user.js');

const user = Router();

user.get('/', asyncHandle(AdminController.getUserProfile));
user.delete('/', asyncHandle(AdminController.deleteUser));
user.put('/', asyncHandle(AdminController.updateUser));

module.exports = user;
