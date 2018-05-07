/* eslint-env mocha */
const supertest = require('supertest')

describe('Payment Servie', () => {
  const api = supertest('http://192.168.99.100:3003')
  const testPayment = {
    userName: 'Bryan Henderson',
    currency: 'usd',
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2018',
    amount: 71,
    description: `
      Ticket(s) for movie "Saving Private Ryan",
      with seat(s) 47, 48
      at time 8 / feb / 18`
  }

  it('can make a paymentOrder', (done) => {
    api.post('/payment/makePurchase')
      .send({paymentOrder: testPayment})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})