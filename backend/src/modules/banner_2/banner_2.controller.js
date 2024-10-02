const banner_2Service = require("./banner_2.service")
const { deleteFile } = require("../../utilies/helper")
const uploadImage = require("../../config/cloudinary.config")

class Banner_2Controller {
    banner_2Details
    #validateId = async(id)=>{
        try{
            
            if(!id){
                throw{status:400, message:"Id is required"}
            }
            this.banner_2Details = await banner_2Service.getDetailByFilter({
                _id :id
            })
            if(!this.banner_2Details){
                throw{status:404, message:"Banner does not exist"}
            }

        }
        catch(exception){
            throw exception
        }
    }
    index = async(req,res,next)=>{
        try{
            const {count, data} = await banner_2Service.listData()
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
    update= async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validateId(id)

            const data = req.body

            // if file is also being updatted
            if(req.file){
                data.desktopImage = await uploadImage('./public/uploads/banner_2/'+req.file.filename)                
                data.mobileVideo = await uploadImage('./public/uploads/banner_2/'+req.file.filename)                
                data.desktopVideo = await uploadImage('./public/uploads/banner_2/'+req.file.filename)                
                data.mobileImage = await uploadImage('./public/uploads/banner_2/'+req.file.filename)                
            }
                deleteFile('./public/uploads/banner_2/'+req.file.filename)
            
                // updated daata saved

                const response = await banner_2Service.updateBanner(data, id);
                res.json({
                    result:response,
                    message:"Banner updated sucessfully",
                    meta:null
                })

        }
        catch(exception){
            next(exception)
        }
        
    }


}

module.exports= new Banner_2Controller