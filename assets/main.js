document.querySelector('#submit').addEventListener('click', songSearch)

async function songSearch() {
    const query = document.getElementById('artistName').value;
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`);
    const data = await res.json()
    console.log(data)
}
