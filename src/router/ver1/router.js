const { asyncHandle } = require("#utils/asyncHandle/index.js");
const { joiSchema } = require("#middleware/validate/joiSchema.js");
const { validateReq } = require("#middleware/validate/validate.js");
const { Router } = require("express");
const { serve, setup } = require("swagger-ui-express");
const { specs } = require("#docs/ver1/setupDocs.js");

const ver1 = Router();

ver1.use("/docs", serve, setup(specs));

ver1.use(
  "/access",
  asyncHandle(validateReq(joiSchema)),
  require("#router/ver1/access/router.js")
);

module.exports = ver1;
