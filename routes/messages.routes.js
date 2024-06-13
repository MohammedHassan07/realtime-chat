const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const { getMessages } = require('../controller/messages.controller')

const route = express.Router()

route.get('/get-messages/:chatId', verifyJWT, getMessages)

module.exports = route