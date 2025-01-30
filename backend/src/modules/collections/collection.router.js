const router = require("express").Router()
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { uploadImageAndVideo, setPath } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const collectionController = require("./collection.controller")
const { collectionDTO, collectionUpdateDTO } = require("./collections.request")

router.route('/list')
    .get(collectionController.listForHome)
    
router.route('/')

    .post(loginCheck, hasPermission('admin'), setPath('collection'), uploadImageAndVideo(), bodyValidator(collectionDTO), collectionController.create) //create collection
    .get(loginCheck, hasPermission('admin'), collectionController.index) //list collection

router.route('/:id')
    .get( collectionController.show) //get collection by id
    .put(loginCheck, hasPermission('admin'), setPath('collection'), uploadImageAndVideo(), bodyValidator(collectionUpdateDTO), collectionController.update) //update collection
    .delete(loginCheck, hasPermission('admin'), collectionController.delete) // delete collection

router.route('/fetchById/:collectionId')
    .get(collectionController.fetchById)

module.exports = router