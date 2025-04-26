const OrderModel = require("./Order.model")

class OrderService {

    listData=async({skip, limit, filter})=>{
        try{
            const count = await OrderModel.countDocuments(filter)
            const data = await OrderModel.find(filter)
                .populate({
                    path: "cartId", // Populate cart details
                    populate: {
                        path: "items.productId", // Populate product details in the cart
                        model: "products", // Replace with your product model name
                        select: "title price mainImage", // Include necessary fields
                    },
                })
                .populate({
                    path: "customerId",
                    select: ["fullname", "email", "phone","address"], // Fetch specific fields
                })
                .populate("userId", ["_id", "email", "name"])
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip)
            
            return {count, data}
        }catch(exception){
            throw exception
        }
    }

}

module.exports = new OrderService