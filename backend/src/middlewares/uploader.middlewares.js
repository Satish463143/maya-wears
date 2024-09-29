
const multer = require("multer")
const fs = require('fs')
const { randomStringGenerator } = require("../utilies/helper");
const { FileFilterType } = require("../config/constants.config")


const myStorage = multer.diskStorage({
    destination:(req,file, cb)=>{
        const path = "./public/uploads/"+req.uploadPath
        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive:true})
        }
        cb(null, path)
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split(".").pop()
        const filename = randomStringGenerator(40)+"."+ext
        cb(null,filename)
    }
})


const uplaodFile = (fileType = FileFilterType.IMAGE)=>{
    let allowed = ['jpg','png','webp','gif']
    if(fileType === FileFilterType.DOCUMENT){
        allowed=['pdf','txt','docs']
    }else if(fileType === FileFilterType.VIDEO){
        allowed = ['mp4', 'mov', 'mkv']
    }

    return multer ({
        storage : myStorage,
        limits:{
            fileSize:3000000
        },
        fileFilter:(req,file,cb)=>{
            const ext = file.originalname.split(".").pop()           
    
            if(allowed.includes(ext.toLowerCase())){
                cb(null,true)
            }else{
                cb({code:400, message:"File format not supproted"})
            }
        }
    })
}

const setPath = (path)=>{
    return (req,res, next)=>{
        req.uploadPath = path
        next()
    }
}

module.exports = {
    uplaodFile,setPath
}
