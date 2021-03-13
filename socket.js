const http = require("./index").server;
const io = require("socket.io")(http);
const getTimeString = require("./helpers/getTimeString");
const users = require("./data/users");
const userOperations = require("./helpers/userOperations");

io.on("connection", (socket) => {
    socket.on("userJoin", ({ user, room }) => {
        console.log(user + " has joined");
        socket.join(room);
        const time = getTimeString(new Date().toString());
        userOperations.createUser({ id: socket.id, user, room, time })
        const activeUsers = userOperations.getRoomUsers(room)
        console.log('Active users: ', activeUsers)
        io.to(room).emit("userJoin", { user, time, activeUsers });
        socket.on("sendMessage", ({ msg, user }) => {
            const time = getTimeString(new Date().toString());
            io.to(room).emit("sendMessage", { msg, user, time });
        });
        socket.on('radio', function(blob) {
            socket.broadcast.to(room).emit('voice', blob)
        })
        socket.on('viewerEvent', ({ zoom, center }) => {
            socket.broadcast.to(room).emit('viewerEvent', { zoom, center })
        })
    });
    socket.on("disconnect", () => {
        const username = userOperations.getUsername(socket.id);
        const room = userOperations.getUserRoom(socket.id);
        const time = getTimeString(new Date().toString());
        userOperations.removeUser(socket.id)
        const activeUsers = userOperations.getRoomUsers(room)
        console.log(username + " has left " + room);
        socket.broadcast.to(room).emit("userLeave", { user: username, time, activeUsers});
    });
});

module.exports = io;
