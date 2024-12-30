const galleryModel = require("./Gallery.model")

class GallleryService {
    create = async(data)=>{
        try{
            const response = new galleryModel(data)
            return await response.save()

        }catch(exception){
            console.log(exception)
            throw(exception)
        }

    }
    listData = async ({ skip = 0, limit = 0}) => {
        try {
            const count = await galleryModel.countDocuments();
            const data = await galleryModel.find()
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip);
            return { count, data };
        } catch (exception) {
            throw exception;
        }
    };
}
module.exports = new GallleryService