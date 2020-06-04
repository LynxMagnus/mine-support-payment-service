const scheduleService = require('./schedule-service')

async function scheduleMessageAction (claim) {
  try {
    await scheduleService.create(claim, new Date())
  } catch (err) {
    console.error('unable to process message ', err)
    throw err
  }
}

module.exports = scheduleMessageAction
