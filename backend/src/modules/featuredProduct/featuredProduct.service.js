const featuredProductModel = require("./featuredProduct.model")

class featuedProductService{
    createProduct = async(data)=>{
        try{
            const product = new featuredProductModel(data)
            return await product.save()
        }catch(exception){
            console.log(exception)
            throw(exception)            
        }
    }
    listdata = async ({ skip , limit , filter })=>{
        try{
            const count = await featuredProductModel.countDocuments(filter)
            const data = await featuredProductModel.find(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip)
            return { count, data }

        }catch(exception){
            console.log(exception)
            throw(exception)
        }
    }
    getIdbyFilter= async(filter)=>{
        try {
            const productDetails = await featuredProductModel.findOne(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
            return productDetails

        } catch (exception) {
            throw exception
        }
    }
    updateFeaturedproduct = async(data, id)=>{
        try {
            const response = await featuredProductModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            return response
        } catch (exception) {
            throw exception
        } 
    }
    deleteFeaturedProduct = async(id)=>{
        try {
            const response = await featuredProductModel.findByIdAndDelete(id)
            if (!response) {
                throw { status: 404, message: "product Not Found" }
            }
            return response
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new featuedProductService