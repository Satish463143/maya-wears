const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const userCtrl = require("../user/user.controller")
const { UserCreateDTO } = require("../user/user.request")
const authController = require("./auth.controller")
const { LoginDTO } = require("./auth.request")

const authRouter = require("express").Router()


authRouter.post("/register",setPath('user'),uplaodFile().single('image'),bodyValidator(UserCreateDTO),userCtrl.userCreate)
authRouter.get("/activate/:token", authController.activateUser)
authRouter.get("/resend-activationtoken/:token", authController.resendActivationToken)

authRouter.post("/login", bodyValidator(LoginDTO), authController.login)
authRouter.get("/me",loginCheck, authController.getLoggedInUser)
authRouter.get("/refresh",authController.refreshToken)

module.exports = authRouter

//hasPermission(['seller','admin','customer']), to check the permission or see action