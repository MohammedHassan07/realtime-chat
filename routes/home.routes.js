const express = require('express')
const { home } = require('../controller/home.contoller')

const route = express.Router()

route.get('/', home)


module.exports = route
