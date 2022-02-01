const app = document.querySelector('#app')
const appLoader = document.querySelector('#loader')
const userListDiv = document.querySelector('#user-list')
const userSearchInput = document.querySelector('#search-input')
const userModal = document.querySelector('#user-modal')
const userModalClose = document.querySelector('#close')

app.style.display = 'none'
appLoader.style.display = 'flex'

let users = []

const url = `https://randomuser.me/api/?results=50`

async function getUsers () {
    let response = await fetch(url)
    return response.json()
}

function filterUsers (users, term) {
    let filteredUsers = users.filter(user => {
        return Object.values(user.name).join('').toLowerCase().includes(term.toLowerCase())
    })
    showUsersInHTML(filteredUsers)
}

function showSingleUser (users, id) {
    let user = users.find(user => user.email === id)
    userModal.style.display = 'block'
    let userModalContent = userModal.querySelector('.content')
    userModalContent.innerHTML = `
        <h1>${user.name.first} ${user.name.last}</h1>
        <p>${user.email}</p>
    `
}

function showUsersInHTML (userList) {
    const userCards = userList.map(user => {
        return `
            <div class="user-card" id="${user.email}">
                <figure>
                    <img src="${user.picture.large}">
                </figure>
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `
    })

    userListDiv.innerHTML = userCards.join('')
    const allUsers = document.querySelectorAll('.user-card')
    allUsers.forEach(user => {
        user.addEventListener('click', () => {
            showSingleUser(users, user.id)
        })
    })
}

getUsers().then(data => {
    app.style.display = 'block'
    appLoader.style.display = 'none'
    users = data.results
    showUsersInHTML(users)
})

userSearchInput.addEventListener('input', () => {
    filterUsers(users, userSearchInput.value)
})

userModalClose.addEventListener('click', () => {
    userModal.style.display = 'none'
})