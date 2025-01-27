
const userSvc = require("../user/user.service")
const {Status} = require("../../config/constants.config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../user/user.model")

class AuthController {
    activateUser =async (req, res,next)=>{
        try{
            const {token} = req.params
            if(token.length !== 100){
                throw {status:422, message:"Invalid Token" }

            } 

            const user = await userSvc.getSingleUserByFilter({
                activationToken: token
            })

            const today = Date.now()
            const activateFor = user.activeFor.getTime();
            if(activateFor < today){
                throw {status:422, message:"Token Expired"}
            }
            user.activationToken= null;
            user.activeFor= null
            user.status  =  Status.ACTIVE

            await user.save();

            res.json({
                result:null,
                message:"Your account has been activated sucessfully. Please proceed to login",
                meta:null
            })
        }
        catch(exception){
            // console.log("I am here too")
            next(exception)
        }
    }
    resendActivationToken =async (req, res, next)=>{
        try{
            const {token} = req.params

            let user = await userSvc.getSingleUserByFilter({
                activationToken: token
            })

            user = userSvc.generateUserActivationToken(user)

            await user.save()

            await userSvc.sendActivationEmail({
                email:user.email,
                name:user.name,
                token:user.activationToken,
                sub:"Resend, Activate Your Account!! "
            })
            res.json({
                result:null,
                message:"A new token has been sent to your email.",
                meta:null
            })

        }
        catch(exception){
            next (exception)
        }
        

    }  

    login = async (req,res,next)=>{ 
        try{
            const {email,password} = req.body;
            const user = await userSvc.getSingleUserByFilter({
                email:email
            })

            if(bcrypt.compareSync(password, user.password)){
                if(user.status === Status.ACTIVE){
                    const token = jwt.sign({
                        sub:user._id,

                    },process.env.JWT_SECRET,
                    // {
                    //     expiresIn:"1 day",
                    //     algorithm:
                    // }
                )
                const refreshToken = jwt.sign({
                    sub:user._id,
                    type:"refresh"

                },process.env.JWT_SECRET,
                {
                    expiresIn:"1 day",
                }
                )
                await UserModel.findByIdAndUpdate(user._id,{token, refreshToken})
                res.json({
                    result:{
                        userDetails:{
                            _id:user._id,
                            name:user.name,
                            email:user.email,
                            role:user.role
                        },
                        token:{token,refreshToken}
                    },
                    message:"Login sucessful",
                    meta:null
                })
                }else{
                    throw{status:422, message:"Your account has not been activated yet. Please activate your account to login"}
                }
            }
            else{
                throw{status:422, message:"Credentials does no match"}
            }

           
        }
        catch(exception){
            next(exception)
        }
    }
    logout= async(req,res,next)=>{
        try{
            const userId = req.user._id

            await UserModel.findByIdAndUpdate(userId,{token:null, refreshToken:null})
            res.json({
                result:null,
                message:"Logout sucessfull",
                meta:null
            })

        }catch(exception){
            console.log("Logout error:", exception); 
            next(exception)
        }
    }

    getLoggedInUser= (req, res,next)=>{
        try{
            res.json({
                result:req.authUser,
                message:"Your profile",
                meta:null
            })

        }catch(exception){
            next(exception)
        }
    }
    refreshToken= async(req,res,next)=>{
        try{
            let token = req.headers['authorization'] || null;
            if (!token) {
                throw { status: 401, message: "Unauthorized access: Token not provided" };
            }

            token = token.split(" ").pop();
            const {sub, type} = jwt.verify(token,process.env.JWT_SECRET);
            if(!type || type !== 'refresh'){
                throw{status:401, message:"Refresh token is required"}
            }

            await userSvc.getSingleUserByFilter({
                _id: sub
            });

            const accessToken = jwt.sign({
                sub: sub

                    },process.env.JWT_SECRET,
                    // {
                    //     expiresIn:"1 day",
                    //     algorithm:
                    // }
                )
            const refreshToken = jwt.sign({
                sub:sub,
                type:"refersh"

            },process.env.JWT_SECRET,
            {
                expiresIn:"1 day",
            }
            )
            res.json({
                result:{
                    token:accessToken,
                    refreshToken:refreshToken
                },
                messaage:"Token refresh",
                meta:null
            })


        }catch(exception){
            next(exception)
        }
    }

}
module.exports = new AuthController