console.log('home.js')

const socket = io()

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('input-message').focus()

})

const btnSend = document.getElementById('btn-send')
btnSend.addEventListener('click', (e) => {

    e.preventDefault()

    const inputMessage = document.getElementById('input-message').value.trim()

    appendMessage(inputMessage, 'right')
    document.getElementById('input-message').value = ''

    sendMessage(inputMessage)
    document.getElementById('input-message').focus()
})

function appendMessage(data, position) {

    const div = document.createElement('div')
    div.classList.add('message', position)

    const date = new Date()

    let hours = date.getHours() % 12
    hours = hours ? hours : 12
    
    const ampm = hours <= 12 ? 'PM' : 'AM'

    const time = `${hours}:${date.getMinutes()} ${ampm}`

    const innerMarkup = `

        <p>${data.message}</p>

        
        <p class="time">${data.time}</p>
    `

    div.innerHTML = innerMarkup

    document.getElementById('messages').appendChild(div)

}

function sendMessage(message) {

    socket.emit('send-message', message)
}

socket.on('broadcast', (data) => {

    appendMessage(data, 'left')
})