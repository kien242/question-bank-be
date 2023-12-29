const { Router } = require('express');

const testRouter = Router();
// testRouter.get('/', asyncHandle(SubjectController.getSubject)); //TODO

// testRouter.put(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.updateSubject),
// ); //TODO

// testRouter.delete(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.deleteSubject),
// ); //TODO

// testRouter.post(
//   '/',
//   asyncHandle(checkRole(ROLE.ADMIN)),
//   asyncHandle(SubjectController.createNewSubject),
// ); //TODO
module.exports = testRouter;
