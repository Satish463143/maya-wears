const mongoose = require('mongoose')

const customerGallerySchema = new mongoose.Schema({
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
const customerGalleryModel = new mongoose.model('CustomerGallery', customerGallerySchema)
module.exports = customerGalleryModel