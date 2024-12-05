const OrderModel = require("./Order.model")

class OrderService {

    listData=async({skip, limit, filter})=>{
        try{
            const count = await OrderModel.countDocuments(filter)
            const data = await OrderModel.find(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
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