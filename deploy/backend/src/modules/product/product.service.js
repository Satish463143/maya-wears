const ProductModel = require('./product.model')

class ProductService {
    createProduct = async (data) => {
        try {
            const product = new ProductModel(data)
            return await product.save()

        } catch (exception) {
            console.error('service exception',exception);
            throw exception
        }
    }
    listData = async ({ skip = 0, limit = 0, filter = {} }) => {
        try {
            const count = await ProductModel.countDocuments(filter);
            const data = await ProductModel.find(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip);
            return { count, data };
        } catch (exception) {
            throw exception;
        }
    };
    getIdbyFilter = async (filter) => {
        try {
            const collectionDetails = await ProductModel.findOne(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
            return collectionDetails

        } catch (exception) {
            throw exception
        }

    }
    updateProduct = async(data,id)=>{
        try{
            const response = await ProductModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            return response

        }catch(exception){
            console.log('update service',exception)
            throw exception
        }
        

    }
    deleteProduct = async (id) => {
        try {
            const response = await ProductModel.findByIdAndDelete(id)
            if (!response) {
                throw { status: 404, message: "Product Not Found" }
            }
            return response
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new ProductService