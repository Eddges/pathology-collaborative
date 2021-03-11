const app = require('express')()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

module.exports = app