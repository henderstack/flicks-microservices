'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/flicks', (req, res, next) => {
    repo.getAllFlicks().then(flicks => {
      res.status(status.OK).json(flicks)
    }).catch(next)
  })

  app.get('/flicks/premieres', (req, res, next) => {
    repo.getFlickPremieres().then(flicks => {
      res.status(status.OK).json(flicks)
    }).catch(next)
  })

  app.get('/flicks/:id', (req, res, next) => {
    repo.getFlickById(req.params.id).then(flick => {
      res.status(status.OK).json(flick)
    }).catch(next)
  })
}