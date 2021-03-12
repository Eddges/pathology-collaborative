const users = require('../data/users')

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

module.exports = {
    getUserRoom,
    getUserTime,
    getUsername
}