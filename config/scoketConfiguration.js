const socketIo = require('socket.io')

function configureSocketConnection(server) {

    const io = socketIo(server)


    // socket connection
    io.on('connection', (socket) => {

        // console.log('a user joined')

        socket.on('send-message', (message) => {

            // console.log(data)

            const date = new Date()
            let hours = date.getHours()
            const ampm = hours >= 12 ? 'PM' : 'AM'
        
            hours = hours % 12
            hours = hours ? hours : 12
            
        
            const time = `${hours}:${date.getMinutes()} ${ampm}`

            socket.broadcast.emit('broadcast', {message, time})

            // also implement message queue to send notification to users
        })
    })


}

module.exports = configureSocketConnection