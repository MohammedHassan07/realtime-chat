console.log('home.js')

import makeRequest from './utils/makeRequest.js'
import makeGetRequest from './utils/makeGetRequest.js'

const socket = io({
    withCredentials: true,
    extraHeaser: {
        'Authorization': document.cookie
    }
})

let messages = document.getElementById('messages')
let bntCreateGroup = document.getElementById('create-goup')
let addMemberForm = document.getElementById('add-members')
let chats;
let groupName;
let recieverId;


// load chats in aside container
document.addEventListener('DOMContentLoaded', async (e) => {

    await renderChats('/chats/chats', 'chats-list')

    // click on chats
    chats = document.querySelectorAll('.chats')
    Array.from(chats).forEach(chat => {

        chat.addEventListener('click', async (e) => {

            await clickOnChat(e)
        })
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

    const inputFields = document.querySelectorAll('.input')

    groupName = document.getElementById('group-name').value

    const memberNumbers = Array.from(inputFields)
        .map(input => input.value)
        .filter(value => value !== "" && value !== undefined)


    console.log(memberNumbers)
    const url = ''
    const response = await makeRequest(url, { memberNumbers, groupName })
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
    appendMessage({ message: inputMessage, time, recieverId }, 'right')
    document.getElementById('input-message').value = ''

    sendMessage({ message: inputMessage, recieverId })
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

function sendMessage(data) {

    console.log(data)
    socket.emit('send-message', data)
}

// render chats
async function renderChats(url, cotnainerId) {

    let chatsList = document.getElementById(cotnainerId)
    chatsList.innerHTML = ''

    const response = await makeGetRequest(url)

    // console.log(response)

    Array.from(response.chats).forEach(chat => {

        const li = document.createElement('li')
        li.classList.add('chats')
        li.setAttribute('id', `${chat._id}`)

        const innerMarkup = `
            <div id="${chat._id}" class="container justify-start al-start p-6 gap-12">
                <div class="img-container">
                    <img class="wp-100 hp-100 brp-50" src="/images/person.jpeg"
                        alt="">
                </div>
                <div class="mt-12">
                    <p id="${chat._id}" class="fs-18">${chat.name}</p>
                </div>
            </div>

        `

        li.innerHTML = innerMarkup
        chatsList.appendChild(li)
    })


}

// click on chats --> get all the message of that chat
async function clickOnChat(e) {

    // console.log(e)
    console.log(e.target.getAttribute('id'))

    const chatId = e.target.getAttribute('id')
    recieverId = chatId

    console.log(chatId, recieverId)
    const url = `/messages/get-messages/${chatId}`

    const response = await makeGetRequest(url)

    console.log(response)

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