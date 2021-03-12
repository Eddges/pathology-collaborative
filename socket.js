const http = require('./index').server
const io = require('socket.io')(http)
const getTimeString = require('./helpers/getTimeString')
const users = require('./data/users')
const userOperations = require('./helpers/userOperations')

io.on('connection', socket => {
    socket.on('userJoin', ({user, room}) => {
        console.log(user + ' has joined')
        socket.join(room)
        const time = getTimeString((new Date).toString())
        users.push({id: socket.id, user, room, time})
        console.log('active users: ', users)
        io.to(room).emit('userJoin', {user, time})
        socket.on('sendMessage', ({msg, user}) => {
            const time = getTimeString((new Date).toString())
            io.to(room).emit('sendMessage', {msg, user, time})
        })
    })
    socket.on('disconnect', (prop) => {
        const room = userOperations.getUserRoom(socket.id)
        const username = userOperations.getUsername(socket.id)
        console.log(username + ' has left ' + room)
        socket.broadcast.to(room).emit('userLeave')
    })
})

module.exports = io