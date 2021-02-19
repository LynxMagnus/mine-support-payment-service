function createEvent (claim, type) {
  return {
    body: claim,
    type,
    source: 'ffc-demo-payment-service'
  }
}

module.exports = createEvent
