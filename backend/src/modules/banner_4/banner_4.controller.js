const banner_4Service = require("./banner_4.service")
const { deleteFile } = require("../../utilies/helper")
const {uploadImage,uploadVideo} = require("../../config/cloudinary.config")
// const  = require("../../config/cloudinary.config")

class Banner_4Controller {
    banner_4Details
    #validateId = async(id)=>{
        try{
            
            if(!id){
                throw{status:400, message:"Id is required"}
            }
            this.banner_4Details = await banner_4Service.getDetailByFilter({
                _id :id
            })
            if(!this.banner_4Details){
                throw{status:404, message:"Banner does not exist"}
            }

        }
        catch(exception){
            throw exception
        }
    }
    index = async(req,res,next)=>{
        try{
            const {count, data} = await banner_4Service.listData()
            res.json({
                result:data,
                message:"List Of Banner",
                meta:{
                    total:count
                }
            })

        }catch(exception){
            next(exception)
        }
    }
    listForHome = async (req, res, next) => {
        try {

            const list = await banner_4Service.listData()
            res.json({
                result: list,
                message: "List of active Collection",
                meta: null
            })
        } catch (exception) {
            next(exception)
        }

    }
    show = async (req, res, next) => {
        try {
            const id = req.params.id
            await this.#validateId(id)
            res.json({
                result: this.banner_4Details,
                message: "Collection fetched By Id",
                meta: null
            })

        }
        catch (exception) {
            console.log(exception + " error")
            next(exception)
        }

    }
    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            await this.#validateId(id);
    
            const data = req.body;    
            // Process the uploaded files
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

    
            const response = await banner_4Service.updateBanner(data, id);
            res.json({
                result: response,
                message: "Banner_4 updated successfully",
                meta: null
            });
        } catch (exception) {
            console.error("Update error:", exception);
            next(exception);
        }
    };
    


}

module.exports= new Banner_4Controller