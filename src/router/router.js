const { Router } = require('express');

const router = Router();

router.use('/v1', require('./ver1/router.js'));

module.exports = router;
