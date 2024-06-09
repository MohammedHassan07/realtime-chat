const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const dotenve = require('dotenv')
const hbs = require('hbs')
const path = require('path')
dotenve.config({path: './config/.env'})

const app = express()

const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))

// routes
const homeRoute = require('./routes/home.routes')
app.use(homeRoute)


const PORT = process.env.PORT
server.listen(PORT, () => {

    console.log('Server is up at ', PORT)
})


// socket connection
io.on('connection', (socket) => {

    // console.log('a user joined')

    socket.on('send-message', (data) => {

        // console.log(data)

        socket.broadcast.emit('broadcast', data)
    })
})
