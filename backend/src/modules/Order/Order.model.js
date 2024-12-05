const mongoose = require('mongoose')
const { orderStatus } = require('../../config/constants.config')

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Types.ObjectId,
        ref : "cart"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    subTotal:{
        type:Number
    },
    discount:{
        type:Number
    },
    serviceCharge:{
        type:Number
    },
    vat:{
        type:Number
    },
    total:{
        type:Number
    },
    orderStatus:{
        type:String,
        enum:[...Object.values(orderStatus)],
        default:orderStatus.PENDING
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
    }, {
        timestamps: true,
        autoIndex: true,
        autoCreate: true
    })
const OrderModel = new mongoose.model('Order',orderSchema )

module.exports = OrderModel