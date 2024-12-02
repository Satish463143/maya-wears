const PromoModel = require("./promo.model")

class PromoService {
    listData =async ()=>{
        try{
            const data = await PromoModel.find()
                .populate("createdBy", ["_id","email", "email", "role"])
            
                return data


        }catch(exception){
            throw(exception)
        }
    }
}

module.exports = new PromoService