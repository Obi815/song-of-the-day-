const express = require('express')
const app = express()
const PORT = 8000

app.listen(process.env.PORT || PORT, () => {
    console.log(`The serving is running on on port ${PORT}! You better go catch it!`)
})
