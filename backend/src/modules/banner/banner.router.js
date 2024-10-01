const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { uplaodFile, setPath } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const bannerController = require("./banner.controller")
const BannerUpdateDTO = require("./banner.request")
const BannerCreateDTO = require("./banner.request")



router.route('/')
    .post(loginCheck,hasPermission('admin'),setPath('banner'),uplaodFile(FileFilterType.IMAGE).single("image"),bodyValidator(BannerCreateDTO),bannerController.create ) //create
    .get(loginCheck,hasPermission('admin'),bannerController.index)  //list all
    

router.route('/:id')
    .get(loginCheck,hasPermission('admin'),bannerController.show) // show banner
    .put(loginCheck,hasPermission('admin'),setPath('banner'),uplaodFile(FileFilterType.IMAGE).single("image"),bodyValidator(BannerUpdateDTO),bannerController.update ) //update
    .delete(loginCheck,hasPermission('admin'),bannerController.delete) //delete banner 


module.exports = router