const { FileFilterType } = require('../../config/constants.config')
const loginCheck = require('../../middlewares/auth.middlewares')
const hasPermission = require('../../middlewares/rbac.middlewares')
const { setPath, uplaodFile } = require('../../middlewares/aws.uploader.middleware')
const CustomerGalleryController = require('./CustomerGallery.controller')

const router = require('express').Router()

router.route('/')
    .post(loginCheck,hasPermission('admin'),setPath('customer-gallery'),uplaodFile(FileFilterType.IMAGE).array('images'),CustomerGalleryController.create)
    .get(CustomerGalleryController.index)

router.route('/delete-by-url/:imageUrl')
    .delete(loginCheck, hasPermission('admin'), CustomerGalleryController.deleteImage);


module.exports = router