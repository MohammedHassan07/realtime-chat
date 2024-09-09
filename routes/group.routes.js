const express = require('express')
const { createGroup } = require('../controller/group.controller')
const verifyJWT = require('../middleware/verifyJWT')

const route = express.Router()

route.post('/create-group', verifyJWT, createGroup)

module.exports = route