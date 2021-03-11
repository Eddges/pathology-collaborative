const http = require('./index').server
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('User connected')
    socket.on('sendMessage', msg => {
        console.log('Chat value: ', msg)
        socket.broadcast.emit('sendMessage', msg)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

module.exports = io