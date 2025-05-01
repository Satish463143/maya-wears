const GalleryService = require("./Gallery.service");
const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
class GalleryController {
    create=async(req,res,next)=>{
        try{
            const data = req.body
            
            // Check if files were uploaded successfully
            if (req.files && Array.isArray(req.files)) {
                // Use AWS S3 locations directly
                data.images = req.files.map(file => file.location);
            } else {
                throw new Error('"images" field is required and must be an array of files');
            }

            const response = await GalleryService.create(data)

            const allFiles = [...(req.files || [])];

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

            const allImages = data.reduce((acc, gallery) => {
                return acc.concat(gallery.images);
            }, []);

            res.json({
                result: {
                    galleries: data,
                    allImages, // Include the flattened array of all images
                },
                message: "List of all galleries with all images",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit,
                },
            });
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    deleteImage=async(req,res,next)=>{
        try{
            const imageUrl = decodeURIComponent(req.params.imageUrl);
            const response = await GalleryService.deleteImageByUrl(imageUrl);

            res.json({
                message: 'Image deleted successfully',
                meta: null,
                result:response,
            });

        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }    
}

module.exports = new GalleryController