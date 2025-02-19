const mongoose = require("mongoose");
const { UserRoles, Status } = require("../../config/constants.config");



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
    
    role: { type: String, default: 'user' },
    status:{
        type:String,
        enum:[...Object.values(Status)],
        default:Status.INACTIVE
    },
    activationToken:{
        type:String,
        default:null,

    },
    token:{
        type:String,
        default:null
    },
    refreshToken:{
        type:String,
        default:null
    },
    activeFor:{ type: Date },
    forgetToken:String,
    forgetFor:String,
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
