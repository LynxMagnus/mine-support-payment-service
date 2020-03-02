'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      claimId: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'pr53'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payments')
  }
}
