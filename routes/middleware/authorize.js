const authorize = (request, response, next) => {
  const teamId = request.header('x-team-id')

  if (teamId === undefined) {
    response.status(401).json({ error: "Missing x-team-id header" });
  } else {
    request.teamId = teamId
    next()
  }
}

module.exports = authorize;