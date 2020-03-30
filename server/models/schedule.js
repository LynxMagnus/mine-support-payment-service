'use strict'
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    scheduleId: { type: DataTypes.INTEGER, primaryKey: true },
    claimId: DataTypes.STRING,
    paymentDate: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'schedules'
  })
  Schedule.associate = function (models) {
    // associations can be defined here
    models.schedule.belongsTo(models.payment, { foreignKey: 'claimId', targetKey: 'claimId' })
  }
  return Schedule
}
