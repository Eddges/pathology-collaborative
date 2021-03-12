let users = require('../data/users')

const createUser = (user) => {
    users.push(user)
}

const getUsername = (id) => {
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

const getRoomUsers = room => {
    // const room = getUserRoom(id)
    const roomUsers = users.filter(iterator => {
        if (iterator.room === room) {
            return true
        }
        return false
    })
    return roomUsers
}

module.exports = {
    createUser,
    getUserRoom,
    getUserTime,
    getUsername,
    removeUser,
    getRoomUsers
}