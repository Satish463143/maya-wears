const mongoose = require('mongoose')
const { orderStatus, paymentType } = require('../../config/constants.config')
const { string, required } = require('joi')

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "cart"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CustomerDetails"
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            title: String,
            size: String,
            quantity: Number,
            productImage: String,
        },
    ],
    
    subTotal:{
        type:Number
    },   
   
    paymentType:{
        type:String,
        enum:[...Object.values(paymentType)],
        required:true
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