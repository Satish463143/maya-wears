const mongoose = require("mongoose");
const { Status } = require("../../config/constants.config");
const { BannerCategory } = require("../../config/constants.config")

const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:3,
        max:100,
    },
    content:{
        type:String,
        max:100,
        default:null,
    },
    desktopImage:String,   
    mobileImage:String,    
    desktopVideo:String,   
    mobileVideo:String,
    category:{
        type:String,
        enum:[BannerCategory.IMAGE, BannerCategory.VIDEO],
        required:true
    },
    link:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:[Status.ACTIVE, Status.INACTIVE],
        default:Status.INACTIVE
    },
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

const BannerModel = mongoose.model("Banner",BannerSchema);

module.exports = BannerModel