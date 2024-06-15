const socketIo = require('socket.io')
const verifySocketJWT = require('../middleware/verifySocketJWT')

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

        socket.on('send-message', (message) => {

            const date = new Date()
            let hours = date.getHours()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hours = hours % 12
            hours = hours ? hours : 12

            const time = `${hours}:${date.getMinutes()} ${ampm}`

            socket.broadcast.emit('broadcast', { message, time })

        })
    })


}

module.exports = configureSocketConnection