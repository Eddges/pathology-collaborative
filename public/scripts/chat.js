const username = localStorage.getItem('user')
const room = localStorage.getItem('room')

socket.emit('userJoin', {user: username, room})

console.log('Socket data: ', socket)

const chatMessages = document.querySelector('.ChatMessages')
const chatInput = document.querySelector('#chatInput')
const chatSend = document.querySelector('#chatSend')
const chatPill = document.querySelector('.ChatPill')
const chatContainer = document.querySelector('#chatContainer')
const closeButton = document.querySelector('.CloseButton')
const activeMembers = document.querySelector('.ActiveMembers')

chatPill.addEventListener('click', () => {
    chatPill.classList.add('ChatPillHidden')
    chatContainer.classList.remove('ChatContainerHidden')
})

closeButton.addEventListener('click', () => {
    chatPill.classList.remove('ChatPillHidden')
    chatContainer.classList.add('ChatContainerHidden')
})

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

socket.on('userJoin', ({user, time, activeUsers}) => {
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
    renderActiveUsers(activeUsers)
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

socket.on('userLeave', ({ user, time, activeUsers}) => {
    const messageDiv = document.createElement('div')
    messageDiv.classList.add('ChatRow')
    messageDiv.classList.add('RowLeft')
    messageDiv.innerHTML = `
        <span class='Meta'>${user} has left <i>${time}</i></span>
        `
    console.log('User left: ', user, time)
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight;
    renderActiveUsers(activeUsers)
})


const renderActiveUsers = users => {
    activeMembers.innerHTML = `<span class='ActiveLabel'>Active</span>`
    console.log('active users: ', users)
    users.forEach(iterator => {
        const memberDiv = document.createElement('div')
        memberDiv.classList.add('Member')
        memberDiv.innerHTML = `
                <i class='far fa-user'></i>
                <span class='MemberName'>${iterator.user}</span>
            `
        activeMembers.appendChild(memberDiv)
    })
}
