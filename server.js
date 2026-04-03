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

    app.get('/', (request, response) => {
      response.sendFile(__dirname + '/index.html')
    })

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(console.error)


