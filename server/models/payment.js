module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    claimId: { type: DataTypes.STRING, primaryKey: true },
    value: DataTypes.DECIMAL
  }, {})
  Payment.associate = function (models) {
    // associations can be defined here
    models.payment.hasMany(models.schedule, { foreignKey: 'claimId', targetKey: 'claimId' })
  }
  return Payment
}
