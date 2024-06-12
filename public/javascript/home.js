console.log('home.js')

const socket = io()

let messages = document.getElementById('messages')
let chats = document.querySelectorAll('.chats')

Array.from(chats).forEach(chat => {

    chat.addEventListener('click', (e) => {
        console.log(e)
    })
})

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('input-message').focus()

})

const btnSend = document.getElementById('btn-send')
btnSend.addEventListener('click', (e) => {

    e.preventDefault()

    const inputMessage = document.getElementById('input-message').value.trim()
    // console.log('send button', inputMessage)

    const date = new Date()
    let hours = date.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12


    const time = `${hours}:${date.getMinutes()} ${ampm}`
    appendMessage({ message: inputMessage, time }, 'right')
    document.getElementById('input-message').value = ''

    sendMessage(inputMessage)
    document.getElementById('input-message').focus()
})

function appendMessage(data, position) {

    const div = document.createElement('div')
    div.classList.add('message', position)

    const innerMarkup = `

        <p>${data.message}</p>

        
        <p class="time">${data.time}</p>
    `

    div.innerHTML = innerMarkup

    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
}

function sendMessage(message) {

    socket.emit('send-message', message)
}

socket.on('broadcast', (data) => {

    appendMessage(data, 'left')
})