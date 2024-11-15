
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const productController = require("./product.controller")
const productDTO = require("./product.request")

const router = require("express").Router()

router.get('/list')

router.route('/')
    .post(
        loginCheck, 
        hasPermission('admin'),
        setPath('product'),
        uplaodFile(FileFilterType.IMAGE).array('images',10),
        uplaodFile(FileFilterType.VIDEO).single('video'),
        bodyValidator(productDTO),
        productController.create,
        )//create


    .get(loginCheck, hasPermission('admin'),productController.index) // list all product

router.route('/:id')
    .get(loginCheck, hasPermission('admin'),) // get by id
    .put(loginCheck, hasPermission('admin'),) // update by id
    .delete(loginCheck, hasPermission('admin'),) // delete by id

module.exports = router