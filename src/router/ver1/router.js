const { Router } = require("express");
const { serve, setup } = require("swagger-ui-express");
const { specs } = require("#docs/ver1/setupDocs.js");
const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { checkAuth } = require("#middleware/check/checkAuth.js");

const ver1 = Router();

ver1.use("/docs", serve, setup(specs));

ver1.use("/access", require("#router/ver1/access/router.js"));
ver1.use(asyncHandle(checkAuth));
ver1.use("/user", require("#router/ver1/user/router.js"));

module.exports = ver1;
