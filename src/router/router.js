const express = require("express");
const router = express.Router();

router.use("/v1", require("#router/ver1/router.js"));

module.exports = router;
