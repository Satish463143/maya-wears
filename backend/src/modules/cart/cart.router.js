const loginCheck = require('../../middlewares/auth.middlewares')
const CartController = require('./cart.controller')

const router  = require('express').Router()

router.route('/')
    .post( CartController.create)
    .get(loginCheck, CartController.index)
router.route('/:id')
     //list all cart
    .put( CartController.edit)
    .delete( CartController.delete) // delete cart

module.exports = router