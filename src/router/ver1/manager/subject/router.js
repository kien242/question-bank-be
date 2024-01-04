const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../../middleware/check/checkRole.js');
const { ROLE } = require('../../../../config/database/user/userRole.js');
const { subjectController } = require('../../../../controller/manage/subject.js');

const subjectRouter = Router();

subjectRouter.get('/', asyncHandle( subjectController.getSubjects ));
subjectRouter.get('/detail', asyncHandle( subjectController.getSubjects ));
subjectRouter.put('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(subjectController.updateSubject ));
subjectRouter.delete('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(subjectController.deleteSubjects));
subjectRouter.post('/', asyncHandle(checkRole(ROLE.ADMIN)), asyncHandle(subjectController.createNewSubject));

module.exports = { subjectRouter };
