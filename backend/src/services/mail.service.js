require('dotenv').config()
const nodemailer = require("nodemailer")
class MailService {
    #transport

    constructor(){
        try{
            this.#transport = nodemailer.createTransport({
                host:process.env.SMTP_HOST,
                port:process.env.SMTP_PORT,
                service:"gmail",
                // secure:false,
                auth:{
                    user:process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            })

            console.log("server connected smtp")

        }
        catch(exception){
            console.log(exception)
            console.log("error connecting mail service")
            //
            //  process.exit(1) (to end the service)
        }
        
    }

    sendEmail =async ({to,sub,message,attchment = null})=>{
        try{
            const msgOpt = {
                to:to,
                from:process.env.SMTP_FROM,
                subject:sub,
                html:message,
            }
            if(attchment){
                msgOpt['attchment'] = attchment;
            }
            const response =await this.#transport.sendMail(msgOpt);
            return response

        }
        catch(exception){
            console.log(exception)
            console.log("error sending mail")
            throw{status:500, message:"Error sending email", details:exception}
        }
    }

}

const mailSvc = new MailService()

module.exports = mailSvc