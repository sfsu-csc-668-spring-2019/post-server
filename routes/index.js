const express = require('express');
const router = express.Router();
const productData = require('./products.json');

router.get('/products', function (req, res, next) {
  res.json(productData);
});

module.exports = router;
