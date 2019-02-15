const validateCredit = ({ amount, cardNumber }) => {
  const errors = []

  if (amount === undefined) {
    errors.push("Credit amount is required")
  } else if (typeof (amount) !== 'number') {
    errors.push("Invalid amount format (must be a number)")
  }

  if (cardNumber === undefined) {
    errors.push("Card number is required")
  } else if (typeof (cardNumber) !== 'number') {
    errors.push("Invalid cardNumber format (must be a number)")
  }

  return errors
}

const creditValidation = ({ body: json }, response, next) => {
  const errors = validateCredit(json)

  if (errors.length > 0) {
    response.status(400).json({ error: errors })
  } else {
    next();
  }
}

module.exports = creditValidation