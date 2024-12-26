const multer = require("multer")
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const productController = require("./product.controller")
const {productDTO,productUpdateDTO} = require("./product.request")

const router = require("express").Router()

router.get('/list',productController.listForHome)

router.route('/')
    .post(
        loginCheck,
        hasPermission('admin'),
        setPath('product'),
        uplaodFile(FileFilterType.IMAGE_VIDEO).fields([
            { name: 'images', maxCount: 10 },
            { name: 'mainImage', maxCount: 1 },
            { name: 'video', maxCount: 1 }, // Add video here
        ]),
       
        bodyValidator(productDTO),
        productController.create,
    )//create


    .get(
        loginCheck,
        hasPermission('admin'),
        productController.index) // list all product

router.route('/:id')
    .get(loginCheck, hasPermission('admin'),productController.show) // get by id
    .put(loginCheck,
        hasPermission('admin'),
        setPath('product'),
        uplaodFile(FileFilterType.IMAGE_VIDEO).fields([
            { name: 'images', maxCount: 10 },
            { name: 'mainImage', maxCount: 1 },
            { name: 'video', maxCount: 1 }, // Add video here
        ]),
        bodyValidator(productUpdateDTO),
        productController.update,) // update by id

    .delete(loginCheck, hasPermission('admin'),productController.delete) // delete by id

module.exports = router