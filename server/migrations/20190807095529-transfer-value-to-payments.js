'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [payments] = await queryInterface.sequelize.query('SELECT DISTINCT "claimId", value FROM public."schedules";')

    if (payments.length) {
      const transformed = payments.map(({ claimId, value }) => ({
        claimId,
        value,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      queryInterface.bulkInsert('payments', transformed)
    }

    queryInterface.removeColumn('schedules', 'value')
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('schedules', 'value', {
      type: Sequelize.DECIMAL
    })
  }
}
