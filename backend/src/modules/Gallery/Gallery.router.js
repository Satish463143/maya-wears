const { FileFilterType } = require('../../config/constants.config')
const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')
const { setPath, uplaodFile } = require('../../middlewares/aws.uploader.middleware')
const GalleryController = require('./Gallery.controller')

const router = require('express').Router()

router.route('/')
    .post(loginCheck,hasPermission('admin'),setPath('gallery'),uplaodFile(FileFilterType.IMAGE).array('images'),GalleryController.create)
    .get(GalleryController.index)

router.route('/delete-by-url/:imageUrl')
    .delete(loginCheck, hasPermission('admin'), GalleryController.deleteImage);


module.exports = router