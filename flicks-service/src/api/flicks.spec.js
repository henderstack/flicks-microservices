/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Flicks API', () => {
  let app = null
  let testFlicks = [{
    'id': '3',
    'title': 'Saving Private Ryan',
    'format': 'IMAX',
    'releaseYear': 1998,
    'releaseMonth': 8,
    'releaseDay': 20
  }, {
    'id': '4',
    'title': 'Slaughterhouse Five',
    'format': 'IMAX',
    'releaseYear': 1975,
    'releaseMonth': 1,
    'releaseDay': 27
  }, {
    'id': '1',
    'title': 'Dredd',
    'format': 'IMAX',
    'releaseYear': 2012,
    'releaseMonth': 6,
    'releaseDay': 16
  }]

  let testRepo = {
    getAllFlicks () {
      return Promise.resolve(testFlicks)
    },
    getFlickPremieres () {
      return Promise.resolve(testFlicks.filter(flick => flick.releaseYear === 2017))
    },
    getFlickById (id) {
      return Promise.resolve(testFlicks.find(flick => flick.id === id))
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all flicks', (done) => {
    request(app)
      .get('/flicks')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Dredd',
          'format': 'IMAX',
          'releaseYear': 2012,
          'releaseMonth': 6,
          'releaseDay': 16
        })
      })
      .expect(200, done)
  })

  it('can get flick premieres', (done) => {
    request(app)
    .get('/flicks/premieres')
    .expect((res) => {
      res.body.should.containEql({
        'id': '1',
        'title': 'Dredd',
        'format': 'IMAX',
        'releaseYear': 2012,
        'releaseMonth': 6,
        'releaseDay': 16
      })
    })
    .expect(200, done)
  })

  it('returns 200 for an known flick', (done) => {
    request(app)
      .get('/flicks/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Dredd',
          'format': 'IMAX',
          'releaseYear': 2012,
          'releaseMonth': 6,
          'releaseDay': 16
        })
      })
      .expect(200, done)
  })
})