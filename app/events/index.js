const { EventSender } = require('ffc-events')
const config = require('../config').eventConfig
const createEvent = require('./create-event')
let sender

async function sendEvent (claim, type) {
  try {
    const event = createEvent(claim, type)
    sender = new EventSender(config)
    await sender.connect()
    await sender.sendEvents([event])
    console.info(`published event for claim ${claim.claimId} of type ${type}`)
  } catch (err) {
    console.error(`Unable to send payment event: ${err}`)
    throw err
  } finally {
    await sender.closeConnection()
  }
}

module.exports = sendEvent
