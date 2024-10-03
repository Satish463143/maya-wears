const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { uplaodFile, setPath } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const collectionController = require("./collection.controller")
const {collectionDTO} = require("./collections.request")

router.route('/')
    .post(loginCheck,hasPermission('admin'),setPath('collection'),uplaodFile(FileFilterType.IMAGE).single("image"),bodyValidator(collectionDTO),collectionController.create) //create collection
    .get(loginCheck,hasPermission('admin'),collectionController.index) //list collection

router.route('/:id')
    .get() //get collection by id
    .put() //update collection
    .delete() // delete collection

module.exports = router