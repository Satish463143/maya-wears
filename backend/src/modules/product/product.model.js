const mongoose = require('mongoose')
const { Wearable } = require("../../config/constants.config")
const { type } = require('./product.request')
const { required } = require('joi')
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        default:null
    },
    description: {
        type: String,
        default:null
    },
    price: {
        type: Number,
        required: true

    },
    promoCode: {
        type: String,
        default:null
    },
    color:{
        type:String,
        default: null
    },
    sizes: [
        {
            size: {
                type: String, 
                required:true               
            }, 
            quantity: {
                type: Number, 
                required:true                
            }, 
        },
    ],
    wearable: {
        type: String,
        enum: [...Object.values(Wearable)],
        default: (Wearable.BOTH),
        required: true
    },
    fabric:{
        type:String,
        default: null
    },
    pattern: {
        type:String,
        default: null
    },
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
    mainImage:{
        type:String,
        required:true
    },
    featureDesktopImage:{
        type:String,
        default: null
    },
    featureMobileImage:{
        type:String,
        default: null
    },
    discount:{
        type:Number,
        default: null
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