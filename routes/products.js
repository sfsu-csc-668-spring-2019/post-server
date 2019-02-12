const express = require('express');
const router = express.Router();
const productData = require('./data/products.json');

router.get('/', function (_, response) {
  response.json(productData);
});

module.exports = router;
