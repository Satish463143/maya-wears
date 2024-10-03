const mongoose = require("mongoose")
const { BannerCategory } = require("../../config/constants.config")

const banner_4Schema = new mongoose.Schema({
    title:{
        type:String,
        max:50,
        default:null,

    },
    content:{
        type:String,
        max:100,
        default:null,
    },
    category:{
        type:String,
        enum:[BannerCategory.IMAGE, BannerCategory.VIDEO],
        required:true
    },
    link:{
        type:String,
        default:null
    },
    desktopImage:String,   
    mobileImage:String,    
    desktopVideo:String,   
    mobileVideo:String,    
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        default:null
    } 
    }, {
        timestamps:true,
        autoIndex:true,
        autoCreate:true
})

const Banner_4Model = mongoose.model("Banner_4", banner_4Schema)

module.exports = Banner_4Model