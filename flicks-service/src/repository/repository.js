'use strict'

const repository = (db) => {
  const collection = db.collection('flicks')

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const flicks = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addFlick = (flick) => {
        flicks.push(flick)
      }
      const sendFlicks = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all flicks, err:' + err))
        }
        resolve(flicks.slice())
      }
      cursor.forEach(addFlick, sendFlicks)
    })
  }

  const getFlickPremieres = () => {
    return new Promise((resolve, reject) => {
      const flicks = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addFlick = (flick) => {
        flicks.push(flick)
      }
      const sendFlicks = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(flicks)
      }
      cursor.forEach(addFlick, sendFlicks)
    })
  }

  const getFlickById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendFlick = (err, flick) => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(flick)
      }
      collection.findOne({id: id}, projection, sendFlick)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllFlicks,
    geFlickPremieres,
    getFlickById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})