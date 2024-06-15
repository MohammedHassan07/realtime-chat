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

        socket.on('send-message', async (data) => {

            const sender = socket.user

            // console.log('socket send-message --> ', sender, data)
           
            const date = new Date()
            let hours = date.getHours()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hours = hours % 12
            hours = hours ? hours : 12

            const time = `${hours}:${date.getMinutes()} ${ampm}`

            socket.broadcast.emit('broadcast', { message: data.message, time })

            await saveMessages({sender, data})

        })
    })


}

module.exports = configureSocketConnection