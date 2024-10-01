const { required } = require("joi");
const mongoose = require("mongoose");
const { UserRoles, Status } = require("../../config/constants.config");

const AddressSchema = mongoose.Schema({
    province:{
        type:String,
        enum:["Koshi", "Madhesh", "Bagmati","Gandaki","Lumbini","Karmali","SudurPaschim"]
    },
    district:String,
    muncipality:String,
    wardNo:Number,
    landMark:String
})

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        min:2,
        max:50,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:[String],
        min:10,
        max:13,
        required:true,
    },
    address:{
        ShippingAddress:AddressSchema
    },
    role:{
        type:String,
        enum:[...Object.values(UserRoles)],
        default:UserRoles.CUSTOMER,
    },
    status:{
        type:String,
        enum:[...Object.values(Status)],
        default:Status.INACTIVE
    },
    activationToken:{
        type:String,
        default:null,

    },
    activeFor:Date,
    forgetToken:String,
    forgetFor:String,
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null,
    },



},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true,
})

const UserModel = mongoose.model("User", UserSchema)


module.exports = UserModel
