const authOrAnonymous = require('../../middlewares/authOrAnonymous.middlewares')
const CartController = require('./cart.controller')

const router  = require('express').Router()


router.route('/')
    .post(authOrAnonymous, CartController.create)
    .get(authOrAnonymous, CartController.index)

router.route('/:id')
    .put(authOrAnonymous, CartController.edit)
    .delete(authOrAnonymous, CartController.deleteById) // delete cart by item

router.route('/cartId/:id')
    .delete(authOrAnonymous, CartController.deleteByCartId)

module.exports = router