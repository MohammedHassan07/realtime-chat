const socketIo = require('socket.io')
const verifySocketJWT = require('../middleware/verifySocketJWT')
const { saveMessages } = require('../controller/messages.controller')

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
    io.on('connection', (socket) => {

        socket.on('login', () => {

            userId = socket.user._id.toString()
            socket.userId = userId
            socket.join(userId)
        })

        socket.on('send-message', async (data) => {

            const sender = socket.user
            const senderId = sender._id.toString()
            const recieverId = data.recieverId

            console.log('socket send-message --> ', senderId, recieverId, data.message)
            // console.log('socket send-message --> ', data)

            const date = new Date()
            let hours = date.getHours()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hours = hours % 12
            hours = hours ? hours : 12

            const time = `${hours}:${date.getMinutes()} ${ampm}`

            // socket.broadcast.emit('broadcast', { message: data.message, time })

            io.to(recieverId).emit('recieve-message', { message: data.message, time })

            await saveMessages({ sender, data })

        })
    })


}

module.exports = configureSocketConnection