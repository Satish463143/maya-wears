const userCtrl = require("./user.controller")

const router = require("express").Router()

const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const { UserCreateDTO } = require("./user.request")


// router.use(loginCheck)
router.route('/')
    .post(loginCheck,hasPermission ,bodyValidator(UserCreateDTO),userCtrl.userCreate)
    .get(userCtrl.userList)


router.route('/:id')
    .get(userCtrl.userDetailById)
    .put(userCtrl.userUpdateById)
    .delete(userCtrl.userDeleteById)

module.exports = router