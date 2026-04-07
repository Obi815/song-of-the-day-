const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

let db

MongoClient.connect(process.env.DB_STRING)
  .then(client => {
    console.log('Connected to Database')

    db = client.db('song-of-day')

    app.use(express.static(__dirname))
    app.use(express.json())

    app.get('/', (request, response) => {
      response.sendFile(__dirname + '/index.html')
    })

    // sending data to the database
    app.post('/addSong', (req, res) => {
      console.log(req.body)

      db.collection('songs').insertOne(req.body)
        .then(result => {
          console.log('Song Added')
          res.json('Song Added') 
        })
        .catch(error => console.error(error))
    })

    // get songs from the database to put respond to the document
    app.get('/savedSongs', (req, res) => {
      const today = new Date().toLocaleDateString() //Gets song by current day. Refreshing Daily

      db.collection('songs').find({ date: today }).toArray()
      .then(data => {
        res.json(data)
      })
      .catch(err => console.log(err))
    })

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(console.error)


