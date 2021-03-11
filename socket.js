const http = require('./index').server
const io = require('socket.io')(http)
const getTimeString = require('./helpers/getTimeString')

io.on('connection', socket => {
    console.log('User connected')
    socket.on('userJoin', ({user, room}) => {
        console.log(user + ' has joined')
        socket.join(room)
        const time = getTimeString((new Date).toString())
        io.to(room).emit('userJoin', {user, time})
        socket.on('sendMessage', ({msg, user}) => {
            console.log('Chat value: ', msg)
            const time = getTimeString((new Date).toString())
            io.to(room).emit('sendMessage', {msg, user, time})
        })
    })
    socket.on('userDisconnected', ({user}) => {
        console.log(user + ' disconnected')
    })
    socket.on('disconnect', (prop) => {
        console.log(prop)
        io.emit('userLeave')
        console.log('User disconnected')
    })
})

module.exports = io