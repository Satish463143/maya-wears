const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Types.ObjectId,
        ref : "cart"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    
})

const OrderModel = new mongoose.model('Order',orderSchema )

module.exports = OrderModel