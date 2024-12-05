const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')
const OrderController = require('./Order.controller')

const router  = require('express').Router()

router.route('/')
    .post( OrderController.create) // user create order
    .get(loginCheck,hasPermission('admin'), OrderController.index ) //list all order for admin

router.get('/listForUser', OrderController.index ) // list all order for user 
router.put('/:id/cancel', OrderController.updateForUser) // update for user

router.route('/:id')
    .get(loginCheck, hasPermission('admin'), OrderController.show) // get order details by id for admin
    .put(loginCheck, hasPermission('admin'), OrderController.update) // get order details by id for admin



module.exports = router