const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', socket => {
    console.log('User connected')
    socket.on('chat message', value => {
        console.log('Chat value: ', value)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port: ', process.env.PORT || 3000)
})