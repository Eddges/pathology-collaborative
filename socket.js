const http = require('./index').server
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('User connected')
    socket.on('chat message', value => {
        console.log('Chat value: ', value)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

module.exports = io