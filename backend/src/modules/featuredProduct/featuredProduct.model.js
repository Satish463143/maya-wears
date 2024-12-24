const mongoose = require('mongoose')
const { Status } = require("../../config/constants.config")

const featuredProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:2,
        max:50,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    subTitle:{
        type:String,
        default:null
    },
    status:{
        type: String,
        enum: [...Object.values(Status)],
        default: Status.INACTIVE
    },
    link:{
        type:String,
        required:true,
    },
    desktopImage:{
        type:String,
        required:true,
    },
    mobileImage:{
        type:String,
        required:true,
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

const featuredProductModel = new mongoose.model('FeaturedProduct', featuredProductSchema)

module.exports = featuredProductModel