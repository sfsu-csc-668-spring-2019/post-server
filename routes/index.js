const express = require('express');
const router = express.Router();
const productData = require('./products.json');
const db = require('../database')
const validateJson = require('./validateJson')

router.get('/', (_, response) => {
  response.text("Nothing to see here")
})

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
  const teamId = request.header('x-team-id')

  if (teamId === undefined) {
    response.status(400).json({ error: "Missing x-team-id header" });
  } else {
    db.one(
      "select sale_data from sales where id=${id} and team_id=${teamId}",
      { ...request.params, teamId }
    )
      .then(({ sale_data }) => {
        response.json(sale_data)
      })
      .catch(error => {
        console.log(error);
        response.status(500).end({ error });
      })
  }
})

router.put('/sales', (request, response) => {
  const teamId = request.header('x-team-id')
  const missing = validateJson(request.body);

  if (teamId === undefined) {
    response.status(400).json({ error: "Missing x-team-id header" });
  } else if (missing.length > 0) {
    response.status(400).json({ error: missing });
  } else {
    db.one(
      "insert into sales (sale_data, created_at, team_id) values ($1, now(), $2) returning id",
      [request.body, teamId]
    )
      .then(result => {
        response.status(201).json(result);
      })
      .catch(error => {
        console.log(error);
        response.status(500).json({ error });
      })
  }
})

module.exports = router;
