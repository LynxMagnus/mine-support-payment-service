describe('Scheduler tests', () => {
  const scheduler = require('../../../server/services/scheduler')

  test('getPaymentDate creates all payment schedules', () => {
    const startDate = new Date(2020, 3, 7)
    const paymentDates = scheduler.getPaymentDates(startDate)

    expect(paymentDates).toHaveLength(6)
  })

  test('getPaymentDate creates correct payment dates', () => {
    const startDate = new Date(2020, 3, 7)
    const paymentDates = scheduler.getPaymentDates(startDate)

    expect(paymentDates).toContainEqual(new Date(2020, 4, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 5, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 6, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 7, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 8, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 9, 1))
  })

  test('getPaymentDate creates correct payment dates at end of 31 day month', () => {
    const startDate = new Date(2020, 2, 31)
    const paymentDates = scheduler.getPaymentDates(startDate)

    expect(paymentDates).toContainEqual(new Date(2020, 3, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 4, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 5, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 6, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 7, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 8, 1))
  })

  test('getPaymentDate creates correct payment dates over year end', () => {
    const startDate = new Date(2020, 10, 15)
    const paymentDates = scheduler.getPaymentDates(startDate)

    expect(paymentDates).toContainEqual(new Date(2020, 11, 1))
    expect(paymentDates).toContainEqual(new Date(2021, 0, 1))
    expect(paymentDates).toContainEqual(new Date(2021, 1, 1))
    expect(paymentDates).toContainEqual(new Date(2021, 2, 1))
    expect(paymentDates).toContainEqual(new Date(2021, 3, 1))
    expect(paymentDates).toContainEqual(new Date(2021, 4, 1))
  })

  test('getPaymentDate creates correct payment dates if first day of month', () => {
    const startDate = new Date(2020, 3, 1)
    const paymentDates = scheduler.getPaymentDates(startDate)

    expect(paymentDates).toContainEqual(new Date(2020, 4, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 5, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 6, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 7, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 8, 1))
    expect(paymentDates).toContainEqual(new Date(2020, 9, 1))
  })
})
