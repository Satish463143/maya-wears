const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')
const promoController = require('./promo.controller')

const router = require('express').Router()

router.route('/')
    .get(loginCheck, hasPermission('admin'), promoController.list)

router.route('/:id')
    .get()

module.exports = router