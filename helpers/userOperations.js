const users = require('../data/users')

const getUsername = (id) => {
    console.log('passed id: ', id)
    console.log('all users: ', users)
    const user = users.find(iterator => iterator.id === id)
    return user.user
}

const getUserRoom = (id) => {
    const user = users.find(iterator => iterator.id === id)
    return user.room
}

const getUserTime = (id) => {
    const user = users.find(iterator => iterator.id === id)
    return user.time
}

const removeUser = id => {
    const newUsers = users.filter(iterator => {
        if (iterator.id === id) {
            return false
        }
        return true
    })

    users = newUsers
}

const getRoomUsers = id => {
    const room = getUserRoom(id)
    const roomUsers = users.filter(iterator => {
        if (iterator.room === room) {
            return true
        }
        return false
    })
    return roomUsers
}

module.exports = {
    getUserRoom,
    getUserTime,
    getUsername,
    removeUser,
    getRoomUsers
}