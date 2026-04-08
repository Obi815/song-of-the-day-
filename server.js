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
    
    app.get('/savedSongs', (req, res) => {
      const today = new Date().toLocaleDateString('en-US')

      db.collection('songs').find({ date: today }).toArray()
        .then(data => {
          res.json(data)
        })
        .catch(err => console.log(err))
    })


    //Get Daily Song
    app.get('/dailySong', async (req, res) => {
      try {
        const today = new Date().toISOString().split('T')[0]

        const existingSong = await db.collection('dailySongs').findOne({ date: today })

        if (existingSong) {
          return res.json(existingSong)
        }

        const genres = [
          'hip hop', 'rap', 'r&b', 'pop', 'afrobeats', 'dance',
          'electronic', 'house', 'techno', 'rock', 'alternative',
          'indie', 'country', 'latin', 'reggaeton', 'jazz',
          'blues', 'soul', 'funk', 'gospel', 'reggae',
          'neo soul', 'disco'
        ]

        const randomGenre = genres[Math.floor(Math.random() * genres.length)]

        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomGenre)}&entity=song&limit=100`)
        const data = await response.json()

        const randomSong = data.results[Math.floor(Math.random() * data.results.length)]

        const dailySong = {
          date: today,
          trackName: randomSong.trackName,
          artistName: randomSong.artistName,
          artwork: randomSong.artworkUrl100.replace('100x100', '600x600'),
          previewUrl: randomSong.previewUrl || ''
        }

        await db.collection('dailySongs').insertOne(dailySong)

        res.json(dailySong)
      } catch (error) {
        console.error(error)
        res.status(500).json('Error getting daily song')
      }
    })

    const serverPort = process.env.PORT || PORT

    app.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}`)
    })
  })
  .catch(console.error)


