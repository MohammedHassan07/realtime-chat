const express = require('express')
const http = require('http')
const dotenve = require('dotenv')
const hbs = require('hbs')
const path = require('path')
const cookieeParser = require('cookie-parser')
const configureSocketConnection = require('./config/scoketConfiguration')
const connectDB = require('./config/conncectDB')
dotenve.config({path: './config/.env'})

const app = express()

const server = http.createServer(app)
configureSocketConnection(server)

app.use(cookieeParser())
app.use(express.json())
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))


const PORT = process.env.PORT
server.listen(PORT, () => {

    console.log('Server is up at ', PORT)
    connectDB()
})


// routes
const userRoute = require('./routes/user.routes')
const homeRoute = require('./routes/home.routes')
const groupRoute = require('./routes/group.routes')
const chatsRoutes = require('./routes/chats.routes')
const messagesRoutes = require('./routes/messages.routes')

app.use('/user', userRoute)
app.use(homeRoute)
app.use('/group', groupRoute)
app.use('/chats', chatsRoutes)
app.use('/messages', messagesRoutes)