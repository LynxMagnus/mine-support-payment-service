const { createSchedule } = require('../schedule')

async function processScheduleMessage (message, receiver) {
  try {
    const scheduleStartDate = new Date()
    await createSchedule(message.body, scheduleStartDate)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processScheduleMessage
