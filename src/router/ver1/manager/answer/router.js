const { Router } = require('express');

const answerRouter = Router();
// answerRouter.get('/', asyncHandle(SubjectController.getSubject)); //TODO

// answerRouter.put(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.updateSubject),
// ); //TODO

// answerRouter.delete(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.deleteSubject),
// ); //TODO

// answerRouter.post(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.createNewSubject),
// ); //TODO
module.exports = answerRouter;
