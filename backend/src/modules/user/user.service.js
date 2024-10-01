require("dotenv").config()
const bcrypt = require("bcryptjs")
const {randomStringGenerator, deleteFile} = require("../../utilies/helper")
const mailSvc = require("../../services/mail.service")
const UserModel = require("../user/user.model")

class UserService {

    generateUserActivationToken = (data)=>{
        data.activationToken = randomStringGenerator(100)
        data.activeFor = new Date(Date.now()+ (process.env.ACTIVE_FOR*60*60*1000))
        return data
    }
    //Create user
    transformUserCreate = (req)=>{
        const data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }

        data.password = bcrypt.hashSync(data.password, 10)
         // bcrypt.compareSync(data.confirmPassword, data.password)
        // delete data.confirmPassword
        
        data.status ="inactive"
        
        this.generateUserActivationToken(data)

        return data
    }
    // send activation mail
    sendActivationEmail = async ({ email, name, token,sub="Activate your Account" }) => {
        try {
            return await mailSvc.sendEmail({
                to: email,
                sub: sub,
                message: `
                    Dear ${name}, <br>
                    <p>Your account has been registered</p>
                    <p>Please click on the link below or copy paste the URL in the browser to activate your account:</p>
                    <a href="${process.env.FRONTEND_URL + 'activate/' + token}">${process.env.FRONTEND_URL + 'activate/' + token}</a>
                    <br>
                    <p>----------------------------------------</p>
                    <p>
                    Regards,
                    </p>
                    <p>
                    ${process.env.SMTP_FROM}
                    </p>
                    <p><small><em>Please do not reply to this email</em></small></p>
                `
            });
        } catch (exception) {
            throw exception;
        }
    };


    // register in database
    registerUser = async  (data) => {
        try{             
        //database connection
        const user = new UserModel(data)
        return await user.save();
        }
        catch(exception){
            if(data.image){
                deleteFile("./public/uploads/user/"+data.image)
            }
            throw exception
            
            // throw {status:400, details:msg, message:"Valiation Error"}
        }
    }

    //get user by database key
    getSingleUserByFilter = async (filter)=>{
        try{
            const userDetails = await UserModel.findOne(filter);
                if(userDetails){
                    return userDetails
                }else{
                    throw {status:404, message:"User does not exits"}
                }
        }
        catch(exception){
           throw exception
        }
       
    }
}

const userSvc = new UserService()

module.exports = userSvc