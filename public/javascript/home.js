console.log('home.js')

import makeRequest from './utils/makeRequest.js'

const socket = io()

let messages = document.getElementById('messages')
let chats = document.querySelectorAll('.chats')
let bntCreateGroup = document.getElementById('create-goup')
let addMemberForm = document.getElementById('add-members')
Array.from(chats).forEach(chat => {

    chat.addEventListener('click', (e) => {
        console.log(e)
    })
})

// close create group form
document.getElementById('overlay').addEventListener('click', () => {
    
    addMemberForm.classList.add('hide')
    document.getElementById('overlay').style.zIndex = -1;
})

// create group
bntCreateGroup.addEventListener('click', (e) => {

    e.preventDefault()
    document.getElementById('overlay').style.zIndex = 0;
    addMemberForm.classList.remove('hide')

    addMemberForm.addEventListener('focusin', function (event) {

        if (event.target.classList.contains('input') && !event.target.nextElementSibling)
            addNewInput(event.target);
    })
})

// add member submit button 
const btnAddMember = document.getElementById('btn-add-members')
btnAddMember.addEventListener('click', async (e) => {
    e.preventDefault()

    console.log(bucketName, bucketId)

    const inputFields = document.querySelectorAll('.input')

    bucketName = document.getElementById('group-name').value

    const memberNumbers = Array.from(inputFields)
        .map(input => input.value)
        .filter(value => value !== "" && value !== undefined)


    const response = await makeRequest(url, memberNumbers)
    console.log(response)

    if (response.flag) {

        addMemberForm.classList.add('hide')
        alert(response.message)
    }
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

// function to create new input field
function addNewInput(inputField) {

    const div = document.createElement('div')

    div.innerHTML =
        `
            <input class="input" type="number" placeholder="Enter number">
        `
    addMemberForm.insertBefore(div, inputField.nextElementSibling)
}

socket.on('broadcast', (data) => {

    appendMessage(data, 'left')
})