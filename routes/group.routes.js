const express = require('express')
const { createGroup } = require('../controller/group.controller')

const route = express.Router()

route.get('/create-group', createGroup)


module.exports = route