const validateCustomer = ({ customer }) => {
  const result = [];

  if (customer === undefined) {
    result.push("Missing customer ID")
  } else if (typeof (customer) !== "string") {
    result.push("Invalid customer format (must be a string)")
  }

  return result;
}

const validateTimeOfSale = ({ timeOfSale }) => {
  const result = [];

  if (timeOfSale === undefined) {
    result.push("Missing time of sale")
  }

  try {
    new Date(timeOfSale)
  } catch {
    result.push("Time of sale is not in a valid date format")
  }

  return result;
}

const validateItems = ({ items }) => {
  const result = []

  if (items === undefined) {
    result.push("Missing items array")
  } else if (!Array.isArray(items)) {
    result.push("An array of items must be provided")
  } else {
    items.forEach(({ upc, quantity, price }, index) => {
      if (upc === undefined) {
        result.push(`Item ${index} is missing UPC`)
      } else if (typeof (upc) !== "string") {
        result.push(`Item ${index} has invalid UPC format (must be string)`)
      }

      if (quantity === undefined) {
        result.push(`Item ${index} is missing quantity`)
      } else if (typeof (quantity) !== "number") {
        result.push(`Item ${index} has invalid quantity format (must be number)`)
      }

      if (price === undefined) {
        result.push(`Item ${index} is missing price`)
      } else if (typeof (price) !== "number") {
        result.push(`Item ${index} has invalid price format (must be number)`)
      }
    })
  }

  return result
}

const validateTotal = ({ total }) => {
  const result = [];

  if (total === undefined) {
    result.push("Missing total")
  } else if (typeof (total) !== "number") {
    result.push("Invalid total format (must be a number)")
  }

  return result;
}

const validateTendered = ({ tendered }) => {
  const result = []

  if (tendered === undefined) {
    result.push("Missing tendered")
  } else if (typeof (tendered) !== 'object') {
    result.push("Invalid tendered format (must be an object)")
  } else {
    if (tendered.type === undefined) {
      result.push("A tendered type (CASH, CHECK, or CREDIT) must be provided")
    } else if (typeof (tendered.type) !== 'string') {
      result.push("Invalid tendered type format (must be a string)")
    } else if (!(tendered.type === "CASH" || tendered.type === "CHECK" || tendered.type === "CREDIT")) {
      result.push("A valid tendered type must be provided (CASH, CHECK, or CREDIT)")
    }

    if (tendered.amount === undefined) {
      result.push("A tendered amount must be provided")
    } else if (typeof (tendered.amount) !== 'number') {
      result.push("Invalid tendered amount provided (must be a number)")
    }
  }

  return result
}

const validateReturned = ({ tendered, returned }) => {
  const result = []

  if (tendered === undefined || tendered.type === undefined) {
    return ['A valid tendered object must be provided to validate returned field']
  } else if (tendered.type !== 'CASH') {
    return []
  } else {
    if (returned === undefined) {
      result.push("Missing returned")
    } else if (typeof (returned) !== "number") {
      result.push("Invalid returned format (must be a number)")
    }
  }

  return result
}

const validateJson = json => {
  return [
    ...validateCustomer(json),
    ...validateTimeOfSale(json),
    ...validateItems(json),
    ...validateTotal(json),
    ...validateTendered(json),
    ...validateReturned(json)
  ]
}

module.exports = validateJson;