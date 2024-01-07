const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../../middleware/check/checkRole.js');
const { ROLE } = require('../../../../config/database/user/userRole.js');
const { subjectController } = require('../../../../controller/manage/subject.js');
const { validateReq } = require('../../../../middleware/validate/validate.js');
const { subjectSch } = require('../../../../middleware/validate/joiSchema.js');
const { REQ_CUSTOM_FILED } = require('../../../../config/reqCustom.js');

const subjectRouter = Router();

subjectRouter.get('/', asyncHandle(subjectController.getSubjects));
subjectRouter.get('/detail', asyncHandle(subjectController.getDetailSubject));
subjectRouter.put('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(subjectController.updateSubject));
subjectRouter.delete('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(subjectController.deleteSubjects));
subjectRouter.post('/', asyncHandle(validateReq(subjectSch, REQ_CUSTOM_FILED.SUBJECT_DATA), checkRole(ROLE.ADMIN)), asyncHandle(subjectController.createNewSubject));

module.exports = subjectRouter;
