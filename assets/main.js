document.querySelector('#submit').addEventListener('click', songSearch)

async function songSearch() {
    const query = document.getElementById('artistName').value;

    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);
    const data = await res.json()

    const results = document.getElementById('results')

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
