const express = require('express');
const router = express.Router();
const db = require('../database')
const authorize = require('./middleware/authorize')
const salesValidation = require('./middleware/salesValidation')

router.get('/', authorize, (request, response) => {
  db.any("select id, sale_data, created_at from sales where team_id=${teamId}", { teamId: request.teamId })
    .then(result => {
      response.json(result);
    })
    .catch(error => {
      response.status(500).end({ error });
    })
})

router.get('/:id', authorize, (request, response) => {
  db.one(
    "select sale_data from sales where id=${id} and team_id=${teamId}",
    { ...request.params, teamId: request.teamId }
  )
    .then(({ sale_data }) => {
      response.json(sale_data)
    })
    .catch(error => {
      response.status(500).end({ error });
    })
})

router.put('/', authorize, salesValidation, (request, response) => {
  db.one(
    "insert into sales (sale_data, created_at, team_id) values ($1, now(), $2) returning id",
    [request.body, request.teamId]
  )
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ error });
    })
})

module.exports = router;
