
module.exports = () => {
  return Promise.resolve(
    {
      userId: 'dev',
      scope: ['payment-admin']
    }
  )
}
