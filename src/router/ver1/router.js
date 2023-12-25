const { Router } = require('express');
const { specs } = require('#docs/ver1/setupDocs.js');
const { serve, setup } = require('swagger-ui-express');
const { ROLE } = require('#config/database/userRole.js');
const { asyncHandle } = require('#utils/asyncHandle/index.js');
const { checkAuth } = require('#middleware/check/checkAuth.js');
const { checkRole } = require('#middleware/check/checkRole.js');
const productRouter = require('./productRouter');

const ver1 = Router();

ver1.use('/docs', serve, setup(specs));

ver1.use('/access', require('#router/ver1/access/router.js'));
ver1.use(asyncHandle(checkAuth));
ver1.use('/user', require('#router/ver1/user/router.js'));
ver1.use('/admin', asyncHandle(checkRole(ROLE.ADMIN)), require('#router/ver1/admin/router.js'));
ver1.use('/product', productRouter)
module.exports = ver1;
