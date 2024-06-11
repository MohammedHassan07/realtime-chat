const express = require('express')
const http = require('http')
const dotenve = require('dotenv')
const hbs = require('hbs')
const path = require('path')
const configureSocketConnection = require('./config/scoketConfiguration')
const connectDB = require('./config/conncectDB')
dotenve.config({path: './config/.env'})

const app = express()

const server = http.createServer(app)
configureSocketConnection(server)

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
// const homeRoute = require('./routes/home.routes')
const userRoute = require('./routes/user.routes')

// app.use(homeRoute)
app.use('/user', userRoute)