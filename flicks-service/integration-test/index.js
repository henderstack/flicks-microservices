/* eslint-env mocha */
const supertest = require('supertest')

describe('flicks-service', () => {
  const api = supertest('http://192.168.99.100:3000')
  it('returns a 200 for a known movies', (done) => {
    api.get('/flicks/premieres')
      .expect(200, done)
  })
})