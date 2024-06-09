const socketIo = require('socket.io')

function configureSocketConnection(server) {

    const io = socketIo(server)


    // socket connection
    io.on('connection', (socket) => {

        // console.log('a user joined')

        socket.on('send-message', (data) => {

            // console.log(data)

            socket.broadcast.emit('broadcast', data)

            // also implement message queue to send notification to users
        })
    })


}

module.exports = configureSocketConnection