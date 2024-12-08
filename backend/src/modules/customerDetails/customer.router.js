const router = require('express').Router()
const authOrAnonymous= require('../../middlewares/authOrAnonymous.middlewares')
const customerController = require('./customer.controller')
const { customerCreateDTO } = require('./customer.request')
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')


router.route('/')
    .post(
        authOrAnonymous,
        (req, res, next) => {
            bodyValidator(customerCreateDTO, { context: { isLoggedIn: !!req.authUser } })(req, res, next);
        },
        customerController.create
    )
    .get(loginCheck,hasPermission('admin'), customerController.index )

router.route('/:id')
    .put(loginCheck,bodyValidator(customerCreateDTO), customerController.update)
    .get( customerController.show)

module.exports = router