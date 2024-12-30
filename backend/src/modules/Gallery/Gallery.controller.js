const GalleryService = require("./Gallery.service");
const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
const { message } = require("../banner/banner.request");
class GalleryController {
    create=async(req,res,next)=>{
        try{
            const data = req.body
            if (req.files.images) {
                data.images = await Promise.all(
                    req.files.images.map(file =>
                        uploadImage('./public/uploads/gallery/' + file.filename)
                    )
                );
            } else {
                throw new Error('"images" field is required and must be an array of files');
            }

            const response = await GalleryService.create(data)
            const allFiles = [
                ...(req.files?.images || [])
            ]

            for (const file of allFiles) {
                await deleteFile('./public/uploads/gallery/' + file.filename);
            }
            res.json({
                result:response,
                message:"Gallery added",
                meta:null
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    index=async(req,res,next)=>{
        try {
            const page = req.query.page || 1
            const limit = +req.query.limit || 10
            const skip = (page - 1) * limit


            const { count, data } = await GalleryService.listData({
                skip: skip,
                limit: limit
            })

            res.json({
                result: data,
                message: "List of all product",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit,

                }
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    show=async(req,res,next)=>{
        try{

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    delete=async(req,res,next)=>{
        try{


        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    
}

module.exports = new GalleryController