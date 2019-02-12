const paymentValidation = (_, response) => {
  if (Math.floor(Math.random() * 100) > 20) {
    response.status(202).end();
  } else {
    response.status(406).end();
  }
}

module.exports = paymentValidation