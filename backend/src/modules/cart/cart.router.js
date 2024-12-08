const authOrAnonymous = require('../../middlewares/authOrAnonymous.middlewares')
const CartController = require('./cart.controller')

const router  = require('express').Router()


router.route('/')

    .post(authOrAnonymous, CartController.create)
    // .get(authOrAnonymous, CartController.index)

router.route('/:id')
    .get(authOrAnonymous, CartController.index)
    .put(authOrAnonymous, CartController.edit)
    .delete(authOrAnonymous, CartController.delete) // delete cart

module.exports = router