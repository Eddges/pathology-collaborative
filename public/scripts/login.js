const form = document.querySelector('#form')
const loginName = document.querySelector('#loginName')
const loginRoom = document.querySelector('#loginRoom')

form.addEventListener('submit', e => {
    e.preventDefault()
    if (loginName.value) {
        localStorage.setItem('user', loginName)
    } else {
        alert('Please provide a username')
    }

    if (loginRoom.value) {
        localStorage.setItem('room', loginRoom)
    } else {
        alert('Please provide a room name')
    }

    if (localStorage.getItem('user') && localStorage.getItem('room')) {
        window.location.href = '/'
    }
})