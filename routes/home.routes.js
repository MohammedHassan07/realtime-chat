const express = require('express')
const { home } = require('../controller/home.contoller')
const verifyJWT = require('../middleware/verifyJWT')

const route = express.Router()

route.get('/', verifyJWT, home)


module.exports = route
