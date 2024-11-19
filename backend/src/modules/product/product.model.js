const mongoose = require('mongoose')
const { Wearable } = require("../../config/constants.config")
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true

    },
    promoCode: {
        type: String,
    },
    color: String,
    sizes: [
        {
            size: {
                type: String,                
            }, 
            quantity: {
                type: Number,                
            }, 
        },
    ],
    wearable: {
        type: String,
        enum: [...Object.values(Wearable)],
        default: (Wearable.BOTH),
        required: true
    },
    fabric: String,
    pattern: String,
    productCollections: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Collection',
            
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        required: true
    },
    video: String,
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
const ProductModel = mongoose.model('products', productSchema)
module.exports = ProductModel