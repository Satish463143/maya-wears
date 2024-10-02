const router  = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const userRouter = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const banner_2Router = require("../modules/banner_2/banner_2.router")


router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/banner",bannerRouter)
router.use("/banner_2",banner_2Router)

module.exports = router