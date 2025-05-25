const express = require("express");
const router = express.Router();
const loginCheck = require("../../middlewares/auth.middlewares")
const hasPermission = require("../../middlewares/rbac.middlewares")
const { setPath,uploadImageAndVideo } = require("../../middlewares/aws.uploader.middleware")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const banner_1Controller = require("./banner_1.controller");
const Banner_1UpdateDTO = require("./banner_1.request");


router.route('/list')
    .get(banner_1Controller.listForHome)

router.route('/')
    .get(loginCheck,hasPermission('admin'),banner_1Controller.index) // list

router.route('/:id')
    .get(loginCheck, hasPermission('admin'), banner_1Controller.show) //get banner by id
    .put(
        loginCheck,
        hasPermission('admin'),
        setPath("banner_1"),    // Set the upload path to 'banner_2'
        uploadImageAndVideo(),  // Use the new upload function
        bodyValidator(Banner_1UpdateDTO),  // Validate the body data
        banner_1Controller.update  // Handle the update operation
    ); 
module.exports = router