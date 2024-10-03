const Banner_4Model = require("./banner_4.model")
class Banner_4Service{
    listData= async()=>{
        try{
            const count = await Banner_4Model.countDocuments()
            const data = await Banner_4Model.find()
            .populate("createdBy", ["_id","email", "email", "role"]) 
                return {count, data}
                
        }catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async ()=>{
        try{
            const banner_4Details = await Banner_4Model.findOne()
                        .populate("createdBy", ["_id","email", "email", "role"])           
            return banner_4Details
        }
        catch(exception){
            throw exception
        }

    }
    updateBanner= async(data,id)=>{
        try{
            const response = await Banner_4Model.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }

}

module.exports = new Banner_4Service