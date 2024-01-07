const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../../middleware/check/checkRole.js');
const { ROLE } = require('../../../../config/database/user/userRole.js');
const { gradeController } = require('../../../../controller/manage/grade.js');
const { validateReq } = require('../../../../middleware/validate/validate.js');
const { gradeSch } = require('../../../../middleware/validate/joiSchema.js');
const { REQ_CUSTOM_FILED } = require('../../../../config/reqCustom.js');

const gradeRouter = Router();

gradeRouter.delete('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.deleteGrade));
gradeRouter.put('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.updateGrade));
gradeRouter.post('/', validateReq(gradeSch, REQ_CUSTOM_FILED.GRADE_DATA), asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(gradeController.createNewGrade));
gradeRouter.get('/', asyncHandle(gradeController.getAllGrade));
gradeRouter.get('/detail', asyncHandle(gradeController.getDetailGrade));

module.exports = gradeRouter;
