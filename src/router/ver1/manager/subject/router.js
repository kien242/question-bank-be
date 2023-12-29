const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../../middleware/check/checkRole.js');
const { ROLE } = require('../../../../config/database/user/userRole.js');

const subjectRouter = Router();

// subjectRouter.get('/', asyncHandle(SubjectController.getSubject)); //TODO

// subjectRouter.put(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.updateSubject),
// ); //TODO

// subjectRouter.delete(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.deleteSubject),
// ); //TODO

// subjectRouter.post(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.createNewSubject),
// ); //TODO

module.exports = subjectRouter;
