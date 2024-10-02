const Banner_2Model = require("./banner_2.model")
class Banner_2Service{
    listData= async()=>{
        try{
            const count = await Banner_2Model.countDocuments()
            const data = await Banner_2Model.find()
            .populate("createdBy", ["_id","email", "email", "role"]) 
                return {count, data}
                
        }catch(exception){
            throw exception
        }
    }
    getDetailByFilter= async ()=>{
        try{
            const banner_2Details = await Banner_2Model.findOne()
                        .populate("createdBy", ["_id","email", "email", "role"])           
            return banner_2Details
        }
        catch(exception){
            throw exception
        }

    }
    updateBanner= async(data,id)=>{
        try{
            const response = await Banner_2Model.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }

}

module.exports = new Banner_2Service