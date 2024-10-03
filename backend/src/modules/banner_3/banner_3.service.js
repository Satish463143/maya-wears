const Banner_3Model = require("./banner_3.model")
class Banner_3Service{
    listData= async()=>{
        try{
            const count = await Banner_3Model.countDocuments()
            const data = await Banner_3Model.find()
            .populate("createdBy", ["_id","email", "email", "role"]) 
                return {count, data}
                
        }catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async ()=>{
        try{
            const banner_3Details = await Banner_3Model.findOne()
                        .populate("createdBy", ["_id","email", "email", "role"])           
            return banner_3Details
        }
        catch(exception){
            throw exception
        }

    }
    updateBanner= async(data,id)=>{
        try{
            const response = await Banner_3Model.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }

}

module.exports = new Banner_3Service