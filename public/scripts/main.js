if (!(localStorage.getItem('user') && localStorage.getItem('room'))) {
    window.location.href = '/login'
} else {
    const username = localStorage.getItem('user')

    const socket = io()
    socket.emit('userJoin', {user: localStorage.getItem('user')})
    
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
            socket.emit('sendMessage', {msg: chatInput.value, user: username})
            chatInput.value = ''
        }
    })

    socket.on('userJoin', ({user, time}) => {
        let msg = ''
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('ChatRow')
        messageDiv.classList.add('RowLeft')
        if (user === localStorage.getItem('user')) {
            msg = 'Welcome to caMicroscope!'
        } else {
            msg = user + ' has joined'
        }
        messageDiv.innerHTML = `
            <span class='Meta'>${msg} <i>${time}</i></span>
            `
        chatMessages.appendChild(messageDiv)
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    
    socket.on('sendMessage', ({msg, user, time}) => {
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('ChatRow')
        if (user === localStorage.getItem('user')) {
            messageDiv.classList.add('RowRight')
        } else {
            messageDiv.classList.add('RowLeft')
        }
        messageDiv.innerHTML = `
            <span class='Meta'>${user} <i>${time}</i></span>
            <span class='Message'>${msg}</span>
            `
        chatMessages.appendChild(messageDiv)
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
}
