const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile } = require("../../middlewares/aws.uploader.middleware")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const featuredProductController = require("./featuredProduct.controller")
const { featuredProductDTO, featuredProductUpdateDTO } = require("./featuredProduct.request")

const router = require("express").Router()


router.get('/list',featuredProductController.listForHome)

router.route('/')
    .post(
        loginCheck,
        hasPermission('admin'),
        setPath('FeaturedProduct'),
        uplaodFile(FileFilterType.IMAGE).fields([
            { name: 'desktopImage', maxCount: 1 },
            { name: 'mobileImage', maxCount: 1 }
        ]),
              
        bodyValidator(featuredProductDTO),
        featuredProductController.create,
    )//create


    .get(loginCheck,hasPermission('admin'), featuredProductController.index) // list all product

router.route('/:id')
    .get(loginCheck, hasPermission('admin'),featuredProductController.show) // get by id
    
    .put(loginCheck, hasPermission('admin'),setPath('FeaturedProduct'),
        uplaodFile(FileFilterType.IMAGE).fields([
            { name: 'desktopImage', maxCount: 1 },
            { name: 'mobileImage', maxCount: 1 }
        ]),
        bodyValidator(featuredProductUpdateDTO),
        featuredProductController.update,) // update by id
    .delete(loginCheck, hasPermission('admin'),featuredProductController.delete) // delete by id

module.exports = router