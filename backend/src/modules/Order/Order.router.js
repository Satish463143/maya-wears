const loginCheck = require('../../middlewares/auth.middlewares')
const OrderController = require('./Order.controller')

const router  = require('express').Router()

router.route('/')
    .post(loginCheck, OrderController.create)

module.exports = router