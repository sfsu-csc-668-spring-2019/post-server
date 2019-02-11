const express = require('express');
const router = express.Router();
const productData = require('./products.json');
const db = require('../database')

router.get('/products', function (_, response) {
  response.json(productData);
});

router.get('/sales', (_, response) => {
  db.any("select * from sales")
    .then(result => {
      response.json(result);
    })
    .catch(_ => {
      response.status(500).end();
    })
})

router.get('/sales/:id', (request, response) => {
  const { id } = request.params;

  db.one("select sale_data from sales where id=${id}", request.params)
    .then(({ sale_data }) => {
      response.json(sale_data)
    })
    .catch(error => {
      console.log(error);
      response.status(500).end();
    })
})

router.put('/sales', (request, response) => {
  db.one("insert into sales (sale_data, created_at) values ($1, now()) returning id", [request.body])
    .then(result => {
      response.status(202).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ error });
    })
})

module.exports = router;
