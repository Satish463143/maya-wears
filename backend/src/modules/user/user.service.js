require("dotenv").config()
const bcrypt = require("bcryptjs")
const {randomStringGenerator} = require("../../utilies/helper")
const mailSvc = require("../../services/mail.service")
class UserService {

    transformUserCreate = (req)=>{
        const data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }

        data.password = bcrypt.hashSync(data.password, 10)
         // bcrypt.compareSync(data.confirmPassword, data.password)
        // delete data.confirmPassword
        data.activationToken = randomStringGenerator(100)
        data.status ="inactive"
        
        data.activeFor = new Date(Date.now()+ (4*60*60*1000))
        return data
    }

    sendActivationEmail = async ({ email, name, token }) => {
        try {
            return await mailSvc.sendEmail({
                to: email,
                sub: "Activation Mail",
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
}

const userSvc = new UserService()

module.exports = userSvc