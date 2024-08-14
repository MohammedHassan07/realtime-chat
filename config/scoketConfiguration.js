const socketIo = require('socket.io')
const verifySocketJWT = require('../middleware/verifySocketJWT')
const { saveMessages } = require('../controller/messages.controller')
const getTime = require('../utils/getTime')

function configureSocketConnection(server) {

    const io = socketIo(server, {
        cors: {
            origin: '*',
            allowedHeaders: ["Authorization"],
            credentials: true
        }
    })

    io.use((socket, next) => {

        verifySocketJWT(socket, next)
    })

    // socket connection
    let users = {};
    io.on('connection', (socket) => {

        const userId = socket.user._id.toString()

        users[userId] = socket.id
        // console.log('users --> ', users)

        socket.on('send-message', async (data) => {

            const sender = socket.user
            const recieverId = data.recieverId
            console.log(recieverId, sender._id)

            const time = getTime()

            io.to(users[recieverId]).emit('recieve-message', { message: data.message, time })

            // socket.broadcast.emit('recieve-message', { message: data.message, time })

            await saveMessages({ sender, data })
        })
    })
}

module.exports = configureSocketConnection