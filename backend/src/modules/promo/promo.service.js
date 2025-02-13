const PromoModel = require("./promo.model")

class PromoService {
    createPromo = async(data)=>{
        try{
            const response =  new  PromoModel(data)
            return await response.save()
        }catch(exception){
            console.log(exception)
            throw exception
        }
    }
    listData =async ({skip=0, limit=0, filter={}} = {})=>{
        try{
            const count = await PromoModel.countDocuments(filter)
            const data = await PromoModel.find(filter)
                .sort({_id:"desc"}) 
                .skip(skip)
                .limit(limit)           
                return {data, count}

        }catch(exception){
            throw(exception)
        }
    }
    getIdbyFilter = async (filter) => {
        try {
            const promoDetails = await PromoModel.findOne(filter)
            return promoDetails

        } catch (exception) {
            throw exception
        }

    } 
    updateDetails= async(data,id)=>{
        try{
            const response = await PromoModel.findByIdAndUpdate(id,{$set:data}, {new:true})
            return response
        }catch(exception){
            throw exception
        }
    }
    deleteById=async(id)=>{
        try{
            const response = await PromoModel.findByIdAndDelete(id);
            if(!response){
                throw {status:404, message:"Promo Not found"}
            }
            return response
        }catch(exception){
            throw exception
        }

    }
}

module.exports = new PromoService