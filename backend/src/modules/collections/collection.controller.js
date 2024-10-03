const { uploadImage } = require("../../config/cloudinary.config")
const { deleteFile } = require("../../utilies/helper")
const collectionService = require("./collection.service")

class CollectionController{
    create =async(re,res,next)=>{
        try{
            const data = req.body

            data.image =await uploadImage('./public/uploads/collection'+req.file.filename)

            deleteFile('./public/uploads/collection'+req.file.filename)
            data.createdBy = req.authUser._id

            const collection  = await collectionService.createCollection(data)

            res.json({
                result:collection,
                message:"Collection Creaetd",
                meta:null
            })

        }
        catch(exception){
            next(exception)
        }
        
    }
    show =(re,res,next)=>{
        try{
            
        }
        catch(exception){
            next(exception)
        }
        
    }
    index =(re,res,next)=>{
        try{
            
        }
        catch(exception){
            next(exception)
        }
        
    }
    update =(re,res,next)=>{
        try{
            
        }
        catch(exception){
            next(exception)
        }
        
    }
    delete =(re,res,next)=>{
        try{
            
        }
        catch(exception){
            next(exception)
        }
        
    }
}
module.exports = new CollectionController