const mongoose = require("mongoose")
const { Status } = require("../../config/constants.config")

const collectionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    decription:{
        type:String,
        required:true
    },
    image:String,
    status:{
        type:String,
        enum:[...Object.values(Status)],
        default:Status.INACTIVE
    },
    slug:{
        type:String,
        required:true,
        unique:true
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

const CollectionModel = mongoose.model("collection", collectionSchema)

module.exports = CollectionModel