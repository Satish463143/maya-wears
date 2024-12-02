
const mongoose = require('mongoose')

const promoSchema = new mongoose.Schema({
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