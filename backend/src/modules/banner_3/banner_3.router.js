const express = require("express");
const router = express.Router();
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile,uploadImageAndVideo } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const banner_3Controller = require("./banner_3.controller");
const banner_2UpdateDTO = require("../banner_2/banner_2.request");


router.route('/list')
    .get(banner_3Controller.listForHome)


router.route('/')
    .get(loginCheck,hasPermission('admin'),banner_3Controller.index) // list

router.route('/:id')
.get(loginCheck, hasPermission('admin'), banner_3Controller.show) //get banner by id
    .put(
        loginCheck,
        hasPermission('admin'),
        setPath("banner_3"),    // Set the upload path to 'banner_2'
        uploadImageAndVideo(),  // Use the new upload function
        bodyValidator(banner_2UpdateDTO),  // Validate the body data
        banner_3Controller.update  // Handle the update operation
    ); 
module.exports = router