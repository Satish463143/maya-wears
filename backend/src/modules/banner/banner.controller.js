const {uploadImage, uploadVideo} = require("../../config/cloudinary.config")
const bannerSvc = require("./banner.service")
const { Status } = require("../../config/constants.config");

class BannerController {
   
    bannerDetails;
    create = async(req,res,next)=>{
        try{
            const data = req.body
            
           if (req.files) {
                if (req.files.desktopVideo) {
                    data.desktopVideo = await uploadVideo(req.files.desktopVideo[0].path);
                }
                if (req.files.mobileVideo) {
                    data.mobileVideo = await uploadVideo(req.files.mobileVideo[0].path);
                }
                if (req.files.desktopImage) {
                    data.desktopImage = await uploadImage(req.files.desktopImage[0].path);
                }
                if (req.files.mobileImage) {
                    data.mobileImage = await uploadImage(req.files.mobileImage[0].path);
                }
            }

            data.createdBy = req.authUser._id

            const banner = await bannerSvc.createBanner(data);
            res.json({
                result:banner,
                message:"Banner created sucessfully",
                meta:null
            })
        }catch(exception){
            console.log(exception)
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
                result:this.bannerDetails,
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

            if (req.files) {
                if (req.files.desktopVideo) {
                    data.desktopVideo = await uploadVideo(req.files.desktopVideo[0].path);
                }
                if (req.files.mobileVideo) {
                    data.mobileVideo = await uploadVideo(req.files.mobileVideo[0].path);
                }
                if (req.files.desktopImage) {
                    data.desktopImage = await uploadImage(req.files.desktopImage[0].path);
                }
                if (req.files.mobileImage) {
                    data.mobileImage = await uploadImage(req.files.mobileImage[0].path);
                }
            }
            
                // updated daata saved

                const response = await bannerSvc.updateBanner(data, id);
                res.json({
                    result:response,
                    message:"Banner updated sucessfully",
                    meta:null
                })


        }catch(exception){
            console.log(exception)            
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
    listForHome= async(req,res,next)=>{
        try {

            const list = await bannerSvc.listData({
                limit: 6,
                filter: {
                    status: Status.ACTIVE
                }
            })
            res.json({
                result: list,
                message: "List of active Banners",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }

    }

}

module.exports = new BannerController