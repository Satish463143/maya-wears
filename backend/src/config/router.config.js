const router  = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const userRouter = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")


router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/banner",bannerRouter)

module.exports = router