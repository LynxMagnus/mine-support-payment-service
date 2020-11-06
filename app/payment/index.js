const { models, sequelize } = require('../services/database-service')()

async function createPayment (payment) {
  await sequelize.transaction(async (transaction) => {
    const existingPayment = await models.payment.findOne({ where: { claimId: payment.claimId } }, { transaction })
    if (!existingPayment) {
      await models.payment.create(payment, transaction)
      console.info(`Saved payment: ${payment.claimId}`)
    }
  })
}

module.exports = {
  createPayment
}
