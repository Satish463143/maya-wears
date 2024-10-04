const {uploadImage}  = require("../../config/cloudinary.config")
const { deleteFile } = require("../../utilies/helper")
const collectionService = require("./collection.service")

class CollectionController{
    
    collectionDetails;
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
    #validate=async(id)=>{
        try{
            if(!id){
                throw{status:400, message:"Id is required"}
            }
            this.collectionDetails = await collectionService.getIdbyFilter({
                _id: id
            })
    
            
            if(!this.collectionDetails){
                throw{status:400, message:"Collection Doesn't Exit"}
            }

        }catch(exception){
            
            throw exception
        }        

    }

    show =async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)
            res.json({
                result:this.collectionDetails,
                message:"Collection fetched By Id",
                meta:null
            })           
            
        }
        catch(exception){
            console.log(exception+" error")
            next(exception)
        }
        
    }
    
    update =async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)
            const data = req.body
            if(req.file){
                data.image =await uploadImage('./public/uploads/collection/'+req.file.filename)
            }

            deleteFile('./public/uploads/collection/'+req.file.filename)

            const response = await collectionService.updateCollection(data,id)
            res.json({
                result:response,
                meessage:"Banner Updated Sucessfully",
                meta:null
            })
        
        
        }catch(exception){
            console.log(exception+" Error here")
            next(exception)
        }
    }
    delete =async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)
            

            const response  = await collectionService.deleteCollection(id)
            res.json({
                result:response,
                message:"Collection deleted Sucessfuly",
                meta: null
            })

            
        }
        catch(exception){
            next(exception)
        }
        
    }
}
module.exports = new CollectionController