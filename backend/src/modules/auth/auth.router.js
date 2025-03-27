
const loginCheck = require("../../middlewares/auth.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const userCtrl = require("../user/user.controller")
const { UserCreateDTO } = require("../user/user.request")
const authController = require("./auth.controller")
const { LoginDTO } = require("./auth.request")
const verifyToken = require ("../../middlewares/validateToken.middleware")

const authRouter = require("express").Router()


authRouter.post("/register", (req, res, next) => {
    console.log("🔍 Raw Request Body:", req.body); // Log before validation
    next();
}, bodyValidator(UserCreateDTO), userCtrl.userCreate);
authRouter.get("/activate/:token", authController.activateUser)
authRouter.get("/resend-activationtoken/:token", authController.resendActivationToken)

authRouter.post("/login", bodyValidator(LoginDTO), authController.login)
authRouter.get("/me",loginCheck,verifyToken, authController.getLoggedInUser)
authRouter.get("/refresh",authController.refreshToken)
authRouter.post("/logout",verifyToken, authController.logout)

module.exports = authRouter

//hasPermission(['seller','admin','customer']), to check the permission or see action