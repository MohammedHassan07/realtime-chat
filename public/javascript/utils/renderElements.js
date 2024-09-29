import { makeGetRequest } from "./networkRequest.js"

// render chats in aside container
async function renderAsideChats(url, cotnainerId) {

    let chatsList = document.getElementById(cotnainerId)
    chatsList.innerHTML = ''

    try {

        const response = await makeGetRequest(url)

        console.log(response)

        if (!response) return

        Array.from(response.data).forEach(chat => {

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
                    <p id="${chat._id}" class="fs-18">${response.type == 'chat' ? chat.name : chat.groupName}</p>
                </div>
            </div>

        `
            li.innerHTML = innerMarkup
            chatsList.appendChild(li)
        })

    } catch (error) {
        console.log(error)
    }
}

// click on chats --> get all the message of that chat
async function clickOnChatTogetMessages(e, recieverId, type) {
    
    const chatId = e.target.getAttribute('id')
    console.log('click chat', recieverId, chatId)

    const userName = e.target.innerText
    document.getElementById('user-name').innerText = userName

    let url = ''
    type == 'chat' ? url = `/messages/get-messages/${recieverId}` : url =  `/messages/get-group-messages/${recieverId}`

    // const url = `/messages/get-messages/${recieverId}`

    const response = await makeGetRequest(url)

    return response
}

// append message in chat window
function appendMessage(data, position) {

    // console.log(data, position)

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

// function to render selected users 
function renderSelectedUsers(usersInGroup) {

    const selectedUserContainer = document.getElementById('selected-users')
    selectedUserContainer.innerHTML = ''

    usersInGroup.forEach(user => {

        const selected = document.createElement('li')
        selected.setAttribute('id', user.userId)
        selected.classList.add('selected', 'container')


        const selectedUserHTML = `
        
        <div class="selected-img">
        <img class="wp-100 hp-100 brp-50" src="/images/person.jpeg" alt="">
        </div>
        <div>
        <p id="selected-user-name">${user.userName}</p>
            </div>
            <div id="deselect-user">
            <img class="wp-100 hp-100" src="/images/close.png" alt="">
            </div>
                    `

        selected.innerHTML = selectedUserHTML
        selectedUserContainer.append(selected)
    })
}

// click to unselect user and rerender the selected users
function renderUnselectedUser(event, usersInGroup) {

    const listItem = event.target.closest('li.selected')
    const userId = listItem.getAttribute('id')

    usersInGroup = usersInGroup.filter(user => user.userId !== userId)

    console.log(usersInGroup)

    renderSelectedUsers(usersInGroup)
}

export {

    renderSelectedUsers,
    renderAsideChats,
    clickOnChatTogetMessages,
    appendMessage,
    renderUnselectedUser
}