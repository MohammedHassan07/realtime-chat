const express = require('express')
const { registerUser, loginUser, authenticate } = require('../controller/user.controller')
const isEmpty = require('../middleware/isEmpty')

const route = express.Router()

route.get('/authenticate', authenticate)

// register
route.post('/register', isEmpty, registerUser)

// login
route.post('/login', isEmpty, loginUser)

module.exports = route