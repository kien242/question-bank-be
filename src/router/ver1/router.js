const { Router } = require('express');
const { serve, setup } = require('swagger-ui-express');
const { specs } = require('../../../docs/ver1/setupDocs.js');
const { ROLE } = require('../../config/database/user/userRole.js');
const { asyncHandle } = require('../../utils/asyncHandle/index.js');
const { checkAuth } = require('../../middleware/check/checkAuth.js');
const { checkRole } = require('../../middleware/check/checkRole.js');

const ver1 = Router();

ver1.use('/docs', serve, setup(specs));
ver1.use('/access', require('./access/router.js'));
ver1.use(asyncHandle(checkAuth));
ver1.use('/user', require('./user/router.js'));
ver1.use('/admin', asyncHandle(checkRole(ROLE.ADMIN)), require('./admin/router.js'));
ver1.use('/question', require('./question/router.js'));

module.exports = ver1;
