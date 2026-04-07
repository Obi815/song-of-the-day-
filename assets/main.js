const mainSOTD = document.getElementById('mainSOTD')
const songOfDay = document.getElementById('dailySong')
const searchSection = document.getElementById('searchSection')
const searchBtn = document.getElementById('search')
const results = document.getElementById('results')
const artistInput = document.getElementById('artistName')
const userNameInput = document.getElementById('userName')

// list of genres
const genres = [
  'hip hop',
  'rap',
  'r&b',
  'pop',
  'afrobeats',
  'dance',
  'electronic',
  'house',
  'techno',
  'rock',
  'alternative',
  'indie',
  'country',
  'latin',
  'reggaeton',
  'jazz',
  'blues',
  'soul',
  'funk',
  'gospel',
  'reggae',
  'neo soul',
  'disco'
]

// getting the current day
const dateEl = document.getElementById('currentDate')

const today = new Date()

dateEl.textContent = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
})

// makes sure only one audio plays at a time
function setupAudioPlayers() {
    const audioPlayers = document.querySelectorAll('audio')

    audioPlayers.forEach(player => {
        player.onplay = () => {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause()
                    otherPlayer.currentTime = 0
                }
            })
        }
    })
    
}


// DAILY SONG OF THE DAY 
async function getDailySong() {
    console.log('daily song function ran')
    let randomGenre = genres[Math.floor(Math.random() * genres.length)]
    // Getting Random Genre from list created

    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomGenre)}&entity=song&limit=100`)
    const data = await res.json()
    
    // Getting random song
    let randomSong = data.results[Math.floor(Math.random() * data.results.length)]
    console.log(randomSong)

    // Creating variables to grab the tags and elements in HTML 
    const mainSong = document.querySelector('.mainSong')
    const dailyArtist = document.querySelector('.dailyArtist')
    const dailyAlbum = document.querySelector('.dailyAlbum')
    const dailySongPreview = document.querySelector('.dailySongPreview')

    // Add to the HTMl
    mainSong.textContent = randomSong.trackName
    dailyArtist.textContent = randomSong.artistName
    dailyAlbum.src = randomSong.artworkUrl100.replace('100x100', '600x600')
    dailySongPreview.src = randomSong.previewUrl || ''

    // setup audio control for main song
    setupAudioPlayers()
}

getDailySong()

// Retrieving songs from the dataBase 
async function getSongs() {
    const res = await fetch('/savedSongs')
    const songs = await res.json()

    const addedSongs = document.getElementById('addedSongs')
    addedSongs.innerHTML = ''

    songs.forEach(song => {
        addedSongs.innerHTML += `
            <div class="song-card saved-card">
                <img class="song-img" src="${song.artwork}" alt="album art">
                <div class="song-info">
                    <h2 class="song-title">${song.trackName}</h2>
                    <p class="song-artist">${song.artistName}</p>
                    <p class="song-user">Added by: ${song.username}</p>
                    ${song.previewUrl ? `<audio class="song-audio" controls src="${song.previewUrl}"></audio>` : ''}
                </div>
            </div>
        `
    })

    setupAudioPlayers()
}

getSongs()

// SEARCH FOR SONG SECTION 
searchBtn.addEventListener('click', songSearch) // Click Event to start search

artistInput.addEventListener('keydown', function(e){ //Enter key event 
    if(e.key === "Enter"){
        e.preventDefault()
        songSearch()
    }
})

async function songSearch() {
    const query = artistInput.value.trim()
    if (!query) return //Artist Input value set to query

    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
    const data = await res.json()
    console.log(data)

    // clear old results for every search
    results.innerHTML = ''
    

    data.results.forEach(song => { //Styling for the search results
        results.innerHTML += `
            <div 
                class="song-card"
                data-track="${song.trackName}"
                data-artist="${song.artistName}"
                data-image="${song.artworkUrl100.replace('100x100','600x600')}"
                data-preview="${song.previewUrl || ''}"
            >
                <img class="song-img" src="${song.artworkUrl100.replace('100x100','300x300')}" alt="album art">
                
                <div class="song-info">
                    <h2 class="song-title">${song.trackName}</h2>
                    <p class="song-artist">${song.artistName}</p>
                    ${song.previewUrl ? `<audio class="song-audio" controls src="${song.previewUrl}"></audio>` : ''}
                    <button class="add-btn">Add</button>
                </div>
            </div>
        `
    })

    // Add Song Button 
    const addButtons = document.querySelectorAll('.add-btn')

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.song-card')

            const username = userNameInput.value.trim()

            if (!username) { // Checks name is filled before completing event
                alert('Please enter your name first')
                return
            }

            // Storing the songs data to be used in MongoDB
            const selectedSong = { 
                username: username,
                trackName: card.dataset.track,
                artistName: card.dataset.artist,
                artwork: card.dataset.image,
                previewUrl: card.dataset.preview,
                date: new Date().toLocaleDateString()
            }

            // clear old results
            results.innerHTML = ''

            // Sending data to the back end to store
            fetch('/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedSong)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.reload()
            })
            .catch(err => console.log(err))
        })
    })

    // setup audio control for all search + main songs
    setupAudioPlayers()

    artistInput.value = ''
}


