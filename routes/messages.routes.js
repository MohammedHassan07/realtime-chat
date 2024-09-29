const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const { getMessages, getGroupMessages } = require('../controller/messages.controller')

const route = express.Router()

route.get('/get-messages/:chatId', verifyJWT, getMessages)

route.get('/get-group-messages/:chatId', verifyJWT, getGroupMessages)

module.exports = route