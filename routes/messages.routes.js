const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const { getMessages } = require('../controller/messages.controller')

const route = express.Router()

route.post('/get-messages', verifyJWT, getMessages)

module.exports = route