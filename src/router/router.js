const { Router } = require('express');
const router = Router();

router.use('/v1', require('#router/ver1/router.js'));
// router.use('/product', require('./router/productRouter/products.js'));

module.exports = router;
