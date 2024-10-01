const uploadImage = require("../../config/cloudinary.config")
const { deleteFile } = require("../../utilies/helper")
const BannerModel = require("./banner.model")
const bannerSvc = require("./banner.service")

class BannerController {
   
    bannerDetails;
    create = async(req,res,next)=>{
        try{
            const data = req.body
            
           data.image = await uploadImage('./public/uploads/banner/'+req.file.filename)
            
            deleteFile('./public/uploads/banner/'+req.file.filename)

            data.createdBy = req.authUser._id

            const banner = await bannerSvc.createBAnner(data);
            res.json({
                result:banner,
                message:"Banner created sucessfully",
                meta:null
            })
        }catch(exception){
            next(exception)

        }
    }
    index = async(req,res,next)=>{
        try{
            //load all banner
           const page = req.query.page ||1
           const limit = +req.query.limit || 10;
           const skip = (page-1) *limit

           let filter = {}
           if(req.query.search){
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
           }
           const {count, data} = await bannerSvc.listData({
            skip:skip,
            filter:filter,
            limit:limit
           })


           res.json({
            result:data,
            message:"Banner list all",
            meta:{
                currentPage:page,
                total:count,
                limit:limit
            }
           })
        }catch(exception){
            next(exception)

        }
    }

    #validateId = async(id)=>{
        try{
            
            if(!id){
                throw{status:400, message:"Id is required"}
            }
            this.bannerDetails = await bannerSvc.getDetailByFilter({
                _id :id
            })
            if(!this.bannerDetails){
                throw{status:404, message:"Banner does not exist"}
            }

        }
        catch(exception){
            throw exception
        }
        

    }

    show = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validateId(id)
            res.json({
                result:bannerDetails,
                message:"Banner Fetched sucessfully",
                meta:null
            })

        }catch(exception){
            next(exception)

        }
    }

    update = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validateId(id)

            const data = req.body

            // if file is also being updatted
            if(req.file){
                data.image = await uploadImage('./public/uploads/banner/'+req.file.filename)
            }
                deleteFile('./public/uploads/banner/'+req.file.filename)
            
                // updated daata saved

                const response = await bannerSvc.updateBanner(data, id);
                res.json({
                    result:response,
                    message:"Banner updated sucessfully",
                    meta:null
                })


        }catch(exception){
            next(exception)

        }
    }

    delete = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validateId(id)

            const response = await bannerSvc.deleteById(id)

            // delete from cloudinary
            res.json({
                result:response,
                message:"Banner deletedd sucessfully",
                meta: null
            })
            
        }catch(exception){
            next(exception)

        }
    }

}

module.exports = new BannerController