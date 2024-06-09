console.log('home.js')

const socket = io()

const btnSend = document.getElementById('btn-send')
btnSend.addEventListener('click', (e) => {

    e.preventDefault()

    const inputMessage = document.getElementById('input-message').value.trim()

    appendMessage(inputMessage, 'right')
    document.getElementById('input-message').value = ''

    sendMessage(inputMessage)
})

function appendMessage(message, position) {

    const div = document.createElement('div')
    div.classList.add('message', position)

    const innerMarkup = `

        <p>${message}</p>
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