require("dotenv").config()
const UserModel = require("./user.model")
const userSvc = require("./user.service")



class UserController {
     userCreate = async (req,res,next)=>{
        try{
        //user create 
        const data = userSvc.transformUserCreate(req)  
       
        // store inn database
        await userSvc.registerUser(data)

        //mail service
        await userSvc.sendActivationEmail({ name: data.name, email: data.email, token: data.activationToken });



        res.status(200).json({
            result:data,
            message:'user created',
            meta:null
        })

       }
    catch(exception){
        console.log("I amm here "+ exception)
        next(exception)

       }
    }

    userList =(req,res)=>{
        res.status(202).json({
            result:null,
            message:' list user created',
            meta:null
        })
    }
    userDetailById = (req,res)=>{
        res.status(202).json({
            result:null,
            message:` user deatils of ${req.params.id}`,
            meta:null
        })
    }

    userUpdateById = (req,res)=>{
        res.status(202).json({
            result:null,
            message:` user updated deatils of ${req.params.id}`,
            meta:null
        })
    }
    userDeleteById =(req,res)=>{
        res.status(202).json({
            result:null,
            message:` user delete deatils of ${req.params.id}`,
            meta:null
        })
    }
}

const userCtrl = new UserController()

module.exports = userCtrl