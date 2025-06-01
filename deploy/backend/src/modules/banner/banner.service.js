const BannerModel = require("./banner.model")

class BannerService {
    createBanner =async (data)=>{
        try{
            const banner = new BannerModel(data)
            return await banner.save()
        }
        catch(exception){
            throw exception
        }
    }
    listData= async({skip=0,limit=10, filter ={}})=>{
        try{
            const count = await BannerModel.countDocuments(filter)
            const data = await BannerModel.find(filter)
            .populate("createdBy", ["_id","email", "name", "role"])
                .sort({_id: "desc"})
                .limit(limit)
                .skip(skip)              

                return {count, data}
                
        }catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async (filter)=>{
        try{
            const bannerDetails = await BannerModel.findOne(filter)
                        .populate("createdBy", ["_id","email", "email", "role"])           
            return bannerDetails
        }
        catch(exception){
            throw exception
        }

    }
    updateBanner= async(data,id)=>{
        try{
            const response = await BannerModel.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }
    deleteById=async(id)=>{
        try{
            const response = await BannerModel.findByIdAndDelete(id);
            if(!response){
                throw {status:404, message:"Banner Not found"}
            }
            return response
        }catch(exception){
            throw exception
        }

    }

    // Optimized method to get active banners for home page (no count, no population)
    getActiveBannersForHome = async (limit = 6) => {
        try {
            const data = await BannerModel.find({
                status: "active"
            })
            .select("title content desktopImage mobileImage desktopVideo mobileVideo category link button status")
            .sort({ _id: "desc" })
            .limit(limit)
            .lean(); // Use lean() for better performance
            
            return data;
        } catch(exception) {
            throw exception;
        }
    }
}

const bannerSvc = new BannerService

module.exports = bannerSvc