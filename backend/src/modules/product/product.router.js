const multer = require("multer")
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const productController = require("./product.controller")
const productDTO = require("./product.request")

const router = require("express").Router()

router.get('/list',productController.listForHome)

router.route('/')
    .post(
        loginCheck,
        hasPermission('admin'),
        setPath('product'),
        uplaodFile(FileFilterType.IMAGE).fields([
            { name: 'images', maxCount: 10 },            
            { name: 'mainImage', maxCount: 1 },       // Single main image
            { name: 'featureDesktopImage', maxCount: 1 }, // Single desktop image
            { name: 'featureMobileImage', maxCount: 1 },  // Single mobile image
        ]),
        uplaodFile(FileFilterType.VIDEO).single('video'), 
       
        bodyValidator(productDTO),
        productController.create,
    )//create


    .get(
        loginCheck,
        hasPermission('admin'),
        productController.index) // list all product

router.route('/:id')
    .get(loginCheck, hasPermission('admin'),productController.show) // get by id
    .put(loginCheck, hasPermission('admin'),) // update by id
    .delete(loginCheck, hasPermission('admin'),productController.delete) // delete by id

module.exports = router