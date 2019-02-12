const checkValidation = (request, response, next) => {
  const { amount } = request.body;

  if (amount === undefined) {
    response.status(400).json({ error: 'Check amount is required' })
  } else if (typeof (amount) !== 'number') {
    response.status(400).json({ error: "Invalid amount format (must be a number)" })
  } else {
    next()
  }
}

module.exports = checkValidation