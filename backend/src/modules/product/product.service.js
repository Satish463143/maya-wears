const ProductModel = require('./product.model')
class ProductService {
    createProduct = async (data) => {
        try {
            const product = new ProductModel(data)
            return await product.save()

        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
<<<<<<< HEAD
    listData = async({ skip , limit , filter })=>{
        try{
=======
    listData = async ({ skip, limit, filter }) => {
        try {
>>>>>>> 824ed21c44c561dc98faae166b1fd158eead41bd
            const count = await ProductModel.countDocuments(filter)
            const data = await ProductModel.find(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip)


            return { count, data }

        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new ProductService