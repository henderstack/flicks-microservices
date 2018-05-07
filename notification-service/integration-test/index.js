/* eslint-env mocha */
const supertest = require('supertest')

describe('Notification Service', () => {
  const api = supertest('http://192.168.99.100:3004')
  const payload = {
    city: 'Waukegan',
    userType: 'loyal',
    totalAmount: 71,
    cinema: {
      name: 'Junction Theaters Megaplex 24',
      room: '1',
      seats: '53, 54'
    },
    movie: {
      title: 'Saving Private Ryan',
      format: 'IMAX',
      schedule: new Date()
    },
    orderId: '1aa90cx',
    description: 'some description',
    user: {
      name: 'Bryan Henderson',
      email: 'bhenderson71@gmail.com'
    }
  }

  it('can send a notification via email', (done) => {
    api.post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})