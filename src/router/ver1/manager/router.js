const { Router } = require('express');
const { ROLE } = require('../../../config/database/user/userRole.js');
const { asyncHandle } = require('../../../utils/asyncHandle/index.js');
const { checkRole } = require('../../../middleware/check/checkRole.js');

const managerRouter = Router();

managerRouter.use('/test', require('./test/router.js'));
managerRouter.use('/question', require('./question/router.js'));
managerRouter.use('/grade', require('./grade/router.js')); // TODO
managerRouter.use('/subject', require('./subject/router.js')); // TODO
managerRouter.use('/user', asyncHandle(checkRole(ROLE.ADMIN)), require('./user/router.js'));
managerRouter.use('/answer', asyncHandle(checkRole(ROLE.ADMIN)), require('./answer/router.js')); // TODO

module.exports = managerRouter;
