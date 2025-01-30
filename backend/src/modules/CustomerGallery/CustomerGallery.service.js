const { deleteFile } = require("../../utilies/helper")
const customerGalleryModel = require("./CustomerGallery.model")

class CustomerGallleryService {
    create = async(data)=>{
        try{
            const response = new customerGalleryModel(data)
            return await response.save()

        }catch(exception){
            console.log(exception)
            throw(exception)
        }

    }
    listData = async ({ skip = 0, limit = 0}) => {
        try {
            const count = await customerGalleryModel.countDocuments();
            const data = await customerGalleryModel.find()
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip);
            return { count, data };
        } catch (exception) {
            throw exception;
        }
    };
    deleteImageByUrl = async (imageUrl) => {
        try {
            const gallery = await customerGalleryModel.findOne({ images: imageUrl });
               
            if (!gallery) {
                throw new Error("Image not found in any gallery");
            }
    
            // Remove the image from the `images` array
            gallery.images = gallery.images.filter((image) => image !== imageUrl);
    
            // Save the updated gallery
            await gallery.save();
    
            // Delete the file from the storage
            const imageName = imageUrl.split("/").pop(); // Extract the filename
            await deleteFile(`./public/uploads/gallery/${imageName}`);
    
            return { removedImage: imageUrl, galleryId: gallery._id };
        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    };
}
module.exports = new CustomerGallleryService