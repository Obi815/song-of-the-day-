const express = require('express')
const app = express()
const PORT = 8000

//Create Song of the Day Object 
const songs = {
    "Let's Drive to Vegas": {
        'album': 'Out The Trunk',
        'artist': 'Larry June',
        'released': 2019
    },
    "face the world": {
        'album': 'Crenshaw',
        'artist': 'Nipsey Hussle',
        'released': 2013
    },
    'mercury': {
        'album': 'Gemini Rights',
        'artist': 'Steve Lacey',
        'date': 2022
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html'); // Getting the html file and responding with it to the browser
})

app.get('/api/:name', (request, response) => {
    const songName = request.params.name.toLowerCase()
    if(rappers[songName]){
        response.json(songs[songName])
    }else{
        response.json(songs['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => { // Telling express to listen to hosting site or local port 
    console.log(`The serving is running on on port ${PORT}! You better go catch it!`)
})