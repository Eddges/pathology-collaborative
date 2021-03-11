const http = require('./index').server
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('User connected')
    socket.on('chat message', msg => {
        console.log('Chat value: ', msg)
        socket.broadcast.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

module.exports = io