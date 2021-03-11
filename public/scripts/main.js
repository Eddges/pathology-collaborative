if (!(localStorage.getItem('user') && localStorage.getItem('room'))) {
    window.location.href = '/login'
} else {
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
}
