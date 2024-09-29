const { setPath, uplaodFile } = require("../../middlewares/uploader.middlewares")
const { bodyValidator } = require("../../middlewares/validator.middlewares")
const userCtrl = require("../user/user.controller")
const { UserCreateDTO } = require("../user/user.request")

const authRouter = require("express").Router()

authRouter.post("/login",(req,res)=>{
    
})
authRouter.post("/register",setPath('user'),uplaodFile().single('image'),bodyValidator(UserCreateDTO),userCtrl.userCreate)
module.exports = authRouter