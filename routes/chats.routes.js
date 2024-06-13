const express = require('express')
const { getAllChats } = require('../controller/chats.controller')
const verifyJWT = require('../middleware/verifyJWT')

const route = express.Router()

route.get('/chats', verifyJWT, getAllChats)

module.exports = route