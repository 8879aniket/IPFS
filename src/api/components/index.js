const express = require('express')
const users = require('./user/router')
const { verifyToken } = require('../middlewares/authCheck')

const router = express.Router()

//router.use(verifyToken)

router.use('/users', users)
module.exports = router
