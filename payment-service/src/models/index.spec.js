/* eslint-env mocha */
const test = require('assert')
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  it('can validate a user object', (done) => {
    const testPayment = {
      userName: 'Bryan Henderson',
      currency: 'usd',
      number: '4242424242424242',
      cvc: '123',
      exp_month: '12',
      exp_year: '2017',
      amount: 71,
      description: `
        Ticket(s) for movie "Saving Private Ryan",
        with seat(s) 47, 48
        at time 8 / feb / 18`
    }

    validate(testPayment, 'payment')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})