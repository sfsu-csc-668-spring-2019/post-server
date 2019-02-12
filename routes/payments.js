const express = require('express');
const router = express.Router();
const authorize = require('./middleware/authorize')
const checkValidation = require('./middleware/checkValidation')
const creditValidation = require('./middleware/creditValidation')
const paymentValidation = require('./middleware/paymentValidation')

router.post('/check', authorize, checkValidation, paymentValidation)

router.post('/credit', authorize, creditValidation, paymentValidation)

module.exports = router;
