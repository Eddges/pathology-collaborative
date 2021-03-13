const logoutButton = document.querySelector('.LogoutButton')

logoutButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = '/login'
})