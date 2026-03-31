const mainSOTD = document.getElementById('mainSOTD')
const songOfDay = document.getElementById('dailySong')
const searchSection = document.getElementById('searchSection')
const searchBtn = document.getElementById('search')
const results = document.getElementById('results')
// const userSOTD = document.getElementById('userSOTD')

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
    let randomGenre = genres[Math.floor(Math.random() * genres.length)]
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomGenre)}&entity=song`)
    const data = await res.json()
    console.log(data)
    
}

getDailySong()


searchBtn.addEventListener('click', songSearch) // Click Event to start search

window.addEventListener('keydown', function(e){ //Enter works as a Click event 
    if(e.key === "Enter"){
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
