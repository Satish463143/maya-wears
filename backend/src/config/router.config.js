const router  = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const userRouter = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const banner_2Router = require("../modules/banner_2/banner_2.router")
const banner_3Router = require("../modules/banner_3/banner_3.router")
const banner_1Router = require("../modules/banner_1/banner-1.router")
const banner_4Router = require("../modules/banner_4/banner-4.router")
const collectionRouter = require("../modules/collections/collection.router")


router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/banner",bannerRouter)
router.use("/banner_1",banner_1Router)
router.use("/banner_2",banner_2Router)
router.use("/banner_3",banner_3Router)
router.use("/banner_4",banner_4Router)
router.use("/collection",collectionRouter)

module.exports = router