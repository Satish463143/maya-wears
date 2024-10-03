const express = require("express");
const router = express.Router();
const { FileFilterType } = require("../../config/constants.config")
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath, uplaodFile,uploadImageAndVideo } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const banner_2Controller = require("./banner_2.controller");
const banner_2UpdateDTO = require("./banner_2.request");




router.route('/')
    //.post(loginCheck,hasPermission('admin'),setPath("banner_2"),uplaodFile(FileFilterType.VIDEO).single('desktopVideo'),uplaodFile(FileFilterType.VIDEO).single('mobielVideo'),uplaodFile(FileFilterType.IMAGE).single('mobileImage'),uplaodFile(FileFilterType.IMAGE).single('desktopImage'),bodyValidator(banner_2CreateDTO),) // create 
    .get(loginCheck,hasPermission('admin'),banner_2Controller.index) // list

router.route('/:id')
    
    .put(
        loginCheck,
        hasPermission('admin'),
        setPath("banner_2"),    // Set the upload path to 'banner_2'
        uploadImageAndVideo(),  // Use the new upload function
        bodyValidator(banner_2UpdateDTO),  // Validate the body data
        banner_2Controller.update  // Handle the update operation
    ); 
module.exports = router