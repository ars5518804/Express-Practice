const router = require('express').Router()

const user = require('./user')
const auth = require('./auth')
const board = require('./board')


router.use('/user', user)
router.use('/auth', auth)
router.use('/board', board)

module.exports = router