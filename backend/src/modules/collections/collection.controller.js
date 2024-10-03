const { uploadImage } = require("../../config/cloudinary.config")
const { deleteFile } = require("../../utilies/helper")
const collectionService = require("./collection.service")

class CollectionController{
    create =async(req,res,next)=>{
        try{
            const data = req.body

            data.image =await uploadImage('./public/uploads/collection/'+req.file.filename)

            deleteFile('./public/uploads/collection/'+req.file.filename)
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
    index =async(req,res,next)=>{
        try{
            const limit = req.query.limit || 10
            const page = req.query.page || 1
            const skip  = (page-1)*limit

            let filter = {}
            if(req.query.search){
                filter ={
                    name: new RegExp(req.query.search, "i")
                }
            } 
            const {data,count} = await collectionService.listdata({
                skip:skip,
                limit:limit,
                filter:filter,               

            })
            res.json({
                result:data,
                message:"List of Collection",
                meta:{
                    currentPage:page,
                    total:count,
                    limit:limit
                }
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