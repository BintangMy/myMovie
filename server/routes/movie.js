const express = require('express')
const router = express.Router()
const {MovieController} = require("../controllers/MovieController")


router.get('/', MovieController.getMovie)


module.exports = router