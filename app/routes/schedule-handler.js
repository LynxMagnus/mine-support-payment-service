const { getById, getAll } = require('../schedule')

async function getClaim (request, h) {
  const data = await getById(request.params.claimId)
  if (data && data.length) {
    return h.response(data).code(200)
  }
  return h.response('Claim not found').code(404)
}

async function getClaims (request, h) {
  const schedules = await getAll()
  return h.response(schedules).code(200)
}

module.exports = {
  getClaim,
  getClaims
}
