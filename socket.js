const http = require('./index').server
const io = require('socket.io')(http)
const getTimeString = require('./helpers/getTimeString')

io.on('connection', socket => {
    console.log('User connected')
    socket.on('userJoin', ({user}) => {
        console.log(user + ' has joined')
        const time = getTimeString((new Date).toString())
        io.emit('userJoin', {user, time})
    })
    socket.on('sendMessage', ({msg, user}) => {
        console.log('Chat value: ', msg)
        const time = getTimeString((new Date).toString())
        io.emit('sendMessage', {msg, user, time})
    })
    socket.on('disconnect', () => {
        io.emit('userLeave')
        console.log('User disconnected')
    })
})

module.exports = io