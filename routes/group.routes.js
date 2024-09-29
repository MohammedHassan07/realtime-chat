const express = require('express')
const { createGroup, getAllGroups } = require('../controller/group.controller')
const verifyJWT = require('../middleware/verifyJWT')

const route = express.Router()

route.post('/create-group', verifyJWT, createGroup)

route.get('/group', verifyJWT, getAllGroups)

module.exports = route