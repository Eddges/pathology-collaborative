const http = require('./index').server
const io = require('socket.io')(http)
const getTimeString = require('./helpers/getTimeString')

io.on('connection', socket => {
    console.log('User connected')
    socket.on('sendMessage', ({msg, user}) => {
        console.log('Chat value: ', msg)
        console.log('time: ', getTimeString((new Date).toString()))
        io.emit('sendMessage', {msg, user})
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

module.exports = io