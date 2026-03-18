const express = require('express')
const app = express()
const PORT = 8000

//Create Song of the Day Object 
const song = {
    'larry june':{
        'song': "Let's Drive to Vegas",
        'album': 'Out The Trunk',
        'released': 2019
    },
    'steve lacey': {
        'song': 'Mercury',
        'album': 'Gemini Rights',
        'released': 2022
    },
    'nipsey hussle': {
        'song': 'Face the World',
        'album': 'Crenshaw',
        'released': 2013
    }
}

app.listen(process.env.PORT || PORT, () => {
    console.log(`The serving is running on on port ${PORT}! You better go catch it!`)
})
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})