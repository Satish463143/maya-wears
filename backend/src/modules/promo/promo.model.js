
const mongoose = require('mongoose')
const { Status } = require("../../config/constants.config");

const promoSchema = new mongoose.Schema({
    promoName:{
        type:String,
        default:null,
        unique:true      
    },
    promoCode:{
        type:String,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    validFrom: {
        type: Date, // Start date for the promo code
        
    },
    validTo: {
        type: Date, // End date for the promo code    
    },
    status:{
        type:String,
        enum:[Status.ACTIVE, Status.INACTIVE],
    },   

    createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null
}
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true

})


const PromoModel = new mongoose.model('Promo', promoSchema)

module.exports = PromoModel