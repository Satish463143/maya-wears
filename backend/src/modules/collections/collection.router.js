const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { uplaodFile, setPath } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const collectionController = require("./collection.controller")
const {collectionDTO,collectionUpdateDTO} = require("./collections.request")

router.route('/')
    .post(loginCheck,hasPermission('admin'),setPath('collection'),uplaodFile(FileFilterType.IMAGE).single("image"),bodyValidator(collectionDTO),collectionController.create) //create collection
    .get(loginCheck,hasPermission('admin'),collectionController.index) //list collection

router.route('/:id')
    .get(loginCheck,hasPermission('admin'),collectionController.show) //get collection by id
    .put(loginCheck,hasPermission('admin'),setPath('collection'),uplaodFile(FileFilterType.IMAGE).single("image"),bodyValidator(collectionUpdateDTO),collectionController.update) //update collection
    .delete(loginCheck,hasPermission('admin'),collectionController.delete) // delete collection

router.route('/list')
    .get(collectionController.listForHome)

module.exports = router