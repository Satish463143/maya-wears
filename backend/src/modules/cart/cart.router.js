const loginCheck = require('../../middlewares/auth.middlewares')
const CartController = require('./cart.controller')

const router  = require('express').Router()

router.route('/')
    .post(loginCheck, CartController.create)
    .get(loginCheck, CartController.index)
router.route('/:id')
     //list all cart
    .put(loginCheck, CartController.edit)
    .delete(loginCheck, CartController.delete) // delete cart

module.exports = router