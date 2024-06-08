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
const PORT = process.env.PORT
server.listen(PORT, () => {

    console.log('Server is up at ', PORT)
})

app.use(express.json())
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('views', path.join(__dirname, './src/views'))
app.use(express.static(path.join(__dirname, './src/public')))

// routes
const homeRoute = require('./src/routes/home.routes')
app.use(homeRoute)

// socket connection
io.on('connection', (socket) => {

    console.log('a user joined')
})
