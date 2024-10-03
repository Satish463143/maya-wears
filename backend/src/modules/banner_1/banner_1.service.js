const Banner_1Model = require("./banner_1.model")
class Banner_1Service{
    listData= async()=>{
        try{
            const count = await Banner_1Model.countDocuments()
            const data = await Banner_1Model.find()
            .populate("createdBy", ["_id","email", "email", "role"]) 
                return {count, data}
                
        }catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async ()=>{
        try{
            const banner_1Details = await Banner_1Model.findOne()
                        .populate("createdBy", ["_id","email", "email", "role"])           
            return banner_1Details
        }
        catch(exception){
            throw exception
        }

    }
    updateBanner= async(data,id)=>{
        try{
            const response = await Banner_1Model.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }

}

module.exports = new Banner_1Service