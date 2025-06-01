const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')
const { bodyValidator } = require('../../middlewares/validator.middlewares')
const promoController = require('./promo.controller')
const { promoDTO, promoUpdateDTO } = require('./promo.request')

const router = require('express').Router()

router.route('/')
    .post(loginCheck, hasPermission('admin'),bodyValidator(promoDTO), promoController.create)
    .get(loginCheck, hasPermission('admin'), promoController.list)
    


router.route('/:id')
    .get(loginCheck, hasPermission('admin'),promoController.showById)
    .put(loginCheck, hasPermission('admin'),bodyValidator(promoUpdateDTO),promoController.update)
    .delete(loginCheck, hasPermission('admin'),promoController.delete)

router.post('/applyPromo', promoController.applyPoromo)

module.exports = router