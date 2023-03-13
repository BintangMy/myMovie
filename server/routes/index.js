const express = require('express')
const router = express.Router()
const user = require("./user")
const movie = require("./movie")
const payment = require("./payment")


router.use('/', user)
router.use('/movie', movie)
router.use('/payment', payment)

module.exports = router