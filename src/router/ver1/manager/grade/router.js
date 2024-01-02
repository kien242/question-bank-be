const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../../middleware/check/checkRole.js');
const { ROLE } = require('../../../../config/database/user/userRole.js');
const { gradeController } = require('../../../../controller/manage/grade.js');

const gradeRouter = Router();

gradeRouter.delete('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.deleteGrade)); //TODO
// gradeRouter.put('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.updateGrade)); //TODO
gradeRouter.post('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.createNewGrade));
gradeRouter.get('/', asyncHandle(gradeController.getAllGrade));

module.exports = gradeRouter;
