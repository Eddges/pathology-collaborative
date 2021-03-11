if (!(localStorage.getItem('user') && localStorage.getItem('room'))) {
    window.location.href = '/login'
} else {
    const socket = io()
    
    const chatMessages = document.querySelector('.ChatMessages')
    const chatInput = document.querySelector('#chatInput')
    const chatSend = document.querySelector('#chatSend')
    
    chatInput.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            chatSend.click()
        }
    })
    
    chatSend.addEventListener('click', () => {
        if (chatInput.value) {
            socket.emit('sendMessage', {msg: chatInput.value, user: localStorage.getItem('user')})
            chatInput.value = ''
        }
    })
    
    socket.on('sendMessage', ({msg, user}) => {
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('ChatRow')
        if (user === localStorage.getItem('user')) {
            messageDiv.classList.add('RowRight')
        } else {
            messageDiv.classList.add('RowLeft')
        }
        messageDiv.innerHTML = `
            <span class='Meta'>${user} <i>${(new Date).getHours()}</i></span>
            <span class='Message'>${msg}</span>
            `
        chatMessages.appendChild(messageDiv)
    })
}
