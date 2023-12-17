const { Router } = require('express');

// eslint-disable-next-line new-cap
const router = Router();

router.use('/v1', require('#router/ver1/router.js'));

module.exports = router;
