const mainSOTD = document.getElementById('mainSOTD')
const songOfDay = document.getElementById('dailySong')
const searchSection = document.getElementById('searchSection')
const searchBtn = document.getElementById('search')
const results = document.getElementById('results')
// const userSOTD = document.getElementById('userSOTD')

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
  'gospel'
]

async function getDailySong() {
    console.log('daily song function ran')
    let randomGenre = genres[Math.floor(Math.random() * genres.length)]
    // Getting Random Genre from list created

    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomGenre)}&entity=song`)
    const data = await res.json()
    
    // Getting random song
    let randomSong = data.results[Math.floor(Math.random() * data.results.length)]
    console.log(randomSong)

    // Creating variables to grab the tags and elements in HTML 
    const mainSong = document.querySelector('.mainSong')
    const dailyArtist = document.querySelector('.dailyArtist')
    const dailyAlbum = document.querySelector('.dailyAlbum')

    // Add to the HTMl
    mainSong.textContent = randomSong.trackName
    dailyArtist.textContent = randomSong.artistName
    dailyAlbum.src = randomSong.artworkUrl100


}

getDailySong()


searchBtn.addEventListener('click', songSearch) // Click Event to start search

const artistInput = document.getElementById('artistName')

artistInput.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        e.preventDefault()
        songSearch()
    }
})

async function songSearch() {
    const query = document.getElementById('artistName').value; //Artist Input value set to query

    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song`);
    const data = await res.json()
    console.log(data)

    // clear old results
    results.innerHTML = ''
    

    data.results.forEach(song => {
        results.innerHTML += `
            <div>
                <h2>${song.trackName}</h2>
                <p>${song.artistName}</p>
                <img src="${song.artworkUrl100}">
            </div>
        `
    })

    document.getElementById('artistName').value = ''
}  