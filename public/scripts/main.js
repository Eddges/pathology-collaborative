// const socket = io();
// var form = document.getElementById("form");
// var input = document.getElementById("input");

// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit("chat message", input.value);
//         input.value = "";
//     }
// });

// socket.on("chat message", (msg) => {
//     console.log("Message: ", msg);
// });

const socket = io()

const chatInput = document.querySelector('#chatInput')
const chatSend = document.querySelector('#chatSend')

chatInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        chatSend.click()
    }
})

chatSend.addEventListener('click', () => {
    if (chatInput.value) {
        socket.emit('sendMessage', chatInput.value)
    }
})

socket.on('sendMessage', msg => {
    console.log('Message: ', msg)
})