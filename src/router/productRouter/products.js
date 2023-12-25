
var express = require('express');
var router = express.Router();
const productModel = require('../../model/productModel.js');

router.post('/create', async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await productModel.create(body);

    return res.status(201).json({
      product: newProduct,
      message: "Tao san pham thanh cong",
    });
    
  } catch (error) {
    res.status(404).send({
      message: "Đã có lỗi sảy ra",
      error: error.message,
    });
  }
});

module.exports = router;
