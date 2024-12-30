const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    images:{
        type:Array,
        required:true,
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
const galleryModel = new mongoose.model('Gallery', gallerySchema)
module.exports = galleryModel