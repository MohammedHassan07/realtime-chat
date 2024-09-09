console.log('home.js')

import { makeGetRequest, makeRequest } from './utils/networkRequest.js'
import getTime from './utils/getTime.js'
import { renderSelectedUsers, renderAsideChats, appendMessage, clickOnChatTogetMessages, renderUnselectedUser } from './utils/renderElements.js'

// socket connection
const socket = io({
    withCredentials: true,
    extraHeaser: {
        'Authorization': document.cookie
    }
})

let bntCreateGroup = document.getElementById('create-goup')
let addMemberForm = document.getElementById('add-members')
let chats;
let groupName;
let recieverId;
let chatId;
let userName;
let userToAddInGroup;
let userCheckBox
let usersInGroup = []

user = document.getElementById('user')
user.innerText = localStorage.getItem('userName')

// load chats in aside container, also get the messages when clicked on any perticular chat
document.addEventListener('DOMContentLoaded', async (e) => {

    await renderAsideChats('/chats/chats', 'chats-list')

    // click on chats
    chats = document.querySelectorAll('.chats')
    Array.from(chats).forEach(chat => {

        chat.addEventListener('click', async (e) => {

            chatId = e.target.getAttribute('id')
            recieverId = chatId

            document.getElementById('messages').innerHTML = ''
            const response = await clickOnChatTogetMessages(e, recieverId)

            const sender = response.messages[0].senderId.toString()
            const reciever = response.messages[0].recieverId.toString()


            // update the position of messages
            if (reciever !== chatId || sender !== chatId) {

                const messages = response.messages.map(message => {

                    chatId === message.recieverId.toString() ? message = {
                        ...message,
                        position: 'right'
                    } : message = {
                        ...message,
                        position: 'left'
                    }

                    return message
                })

                messages.forEach(message => {

                    const time = getTime(message.createdAt)
                    appendMessage({ message: message.message, time }, message.position)
                })
            }
        })
    })
})

// close create group form
document.getElementById('overlay').addEventListener('click', () => {

    addMemberForm.style.display = 'none'
    document.getElementById('overlay').style.zIndex = -1;
})

// create group
bntCreateGroup.addEventListener('click', (e) => {

    e.preventDefault()
    document.getElementById('overlay').style.zIndex = 0;
    addMemberForm.style.display = 'flex'
})

// create group submit button 
const btnAddMember = document.getElementById('btn-add-members')
btnAddMember.addEventListener('click', async (e) => {
    e.preventDefault()

    groupName = document.getElementById('group-name').value

    console.log(groupName, usersInGroup)

    const url = ''
    const response = await makeRequest(url, { usersInGroup, groupName })
    console.log(response)

    if (response.flag) {

        addMemberForm.classList.add('hide')
        alert(response.message)
    }
})


// append message and send message
const btnSend = document.getElementById('btn-send')
btnSend.addEventListener('click', (e) => {

    e.preventDefault()

    const inputMessage = document.getElementById('input-message').value.trim()
    // console.log('send button', inputMessage)

    const time = getTime()
    appendMessage({ message: inputMessage, time }, 'right')
    document.getElementById('input-message').value = ''

    // console.log(recieverId)
    sendMessage({ message: inputMessage, recieverId })
    // console.log({ message: inputMessage, recieverId })
    document.getElementById('input-message').focus()
})

// function to send message
function sendMessage(data) {

    console.log(data)
    socket.emit('send-message', data)
}

// socket to broadcast the message
socket.on('recieve-message', (data) => {

    appendMessage(data, 'left')
})

// search user on input
const searchUsers = document.getElementById('search-users')

// debounce function
function debounce(func, delay) {

    let timeOutId
    return function (...args) {
        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => { func.apply(this, args) }, delay)
    }
}

// debounce handler input
function handleInput(e) {

    userName = e.target.value
    let users = {}
    setTimeout(async () => {

        const GET_USERS_URL = `/user/get-user-by-name/${userName}`

        const response = await makeGetRequest(GET_USERS_URL)

        if (!response.flag) {
            console.log(response.message)
            return
        }

        // append the users in create group form
        let chatList = document.getElementById('group-chats-list')
        chatList.innerHTML = ''
        response.users.forEach(user => {

            const list = document.createElement('li')
            list.classList.add('group-chat', 'gap-17')
            list.innerHTML = `
                <div class="container justify-start p-6 gap-12">
                        <div>
                            <input class="input-checkbox" type="checkbox" id="${user._id}">
                        </div>

                        <div class="container">

                            <div class="create-group-img-container">
                                <img class="wp-100 hp-100 brp-50" src="/images/person.jpeg" alt="">
                            </div>
                            <div class="ml-16 mb-5">
                                <p id="${user._id}" class="fs-18 lists-user-name">${user.name}</p>
                            </div>
                        </div>
                    </div>`

            chatList.append(list)
        })
    }, 1500)
}

const debounceHandleInput = debounce(handleInput, 1500)
searchUsers.addEventListener('input', debounceHandleInput)

// click on selected users list items
const groupChatListItems = document.getElementById('group-chats-list')
groupChatListItems.addEventListener('click', (event) => {

    if (event.target.closest('li.group-chat')) {

        const listItem = event.target.closest('li.group-chat')
        userCheckBox = listItem.querySelector('.input-checkbox')
        userToAddInGroup = listItem.querySelector('.lists-user-name')

        userCheckBox.checked = !userCheckBox.checked

        const userName = userToAddInGroup.innerText
        const userId = userToAddInGroup.getAttribute('id')

        if (userCheckBox.checked) {

            usersInGroup.push({ userId, userName })

            renderSelectedUsers(usersInGroup)
        } else {

            usersInGroup = usersInGroup.filter(user => user.userId !== userId)
        }
        console.log(userCheckBox.checked, usersInGroup)
    }
})

const selectedusers = document.getElementById('selected-users')
selectedusers.addEventListener('click', (event) => {
    renderUnselectedUser(event, usersInGroup)
})

