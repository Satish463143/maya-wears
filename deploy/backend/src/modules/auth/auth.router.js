
const loginCheck = require("../../middlewares/auth.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const userCtrl = require("../user/user.controller")
const { UserCreateDTO } = require("../user/user.request")
const authController = require("./auth.controller")
const { LoginDTO } = require("./auth.request")
const verifyToken = require ("../../middlewares/validateToken.middleware")
const multer = require('multer');
const upload = multer();

const authRouter = require("express").Router()


authRouter.post("/register",upload.none(),  bodyValidator(UserCreateDTO), userCtrl.userCreate);
authRouter.get("/activate/:token", authController.activateUser)
authRouter.get("/resend-activationtoken/:token", authController.resendActivationToken)

authRouter.post("/login",upload.none(), bodyValidator(LoginDTO), authController.login)
authRouter.get("/me",loginCheck,verifyToken, authController.getLoggedInUser)
authRouter.get("/refresh",authController.refreshToken)
authRouter.post("/logout",verifyToken, authController.logout)

module.exports = authRouter

//hasPermission(['seller','admin','customer']), to check the permission or see action