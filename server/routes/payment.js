const express = require('express')
const router = express.Router()
const {paymentController} = require("../controllers/paymentController")


console.log('masuk payment')
router.post('/', paymentController.payment)


module.exports = router