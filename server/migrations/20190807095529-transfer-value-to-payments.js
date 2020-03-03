'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const [payments] = await queryInterface.sequelize.query('SELECT DISTINCT "claimId", value FROM pr53."schedules";')

      if (payments.length) {
        const transformed = payments.map(({ claimId, value }) => ({
          claimId,
          value,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
        await queryInterface.bulkInsert('payments', transformed, { transaction })
      }
      await queryInterface.removeColumn('pr53.schedules', 'value', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('schedules', 'value', {
        type: Sequelize.DECIMAL
      },
      { transaction })

      const [payments] = await queryInterface.sequelize.query('SELECT DISTINCT "claimId", value FROM pr53."payments";')

      await Promise.all(
        payments.map(async (payment) =>
          queryInterface.bulkUpdate('schedules', {
            value: payment.value
          }, {
            claimId: payment.claimId
          },
          { transaction })
        )
      )
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
