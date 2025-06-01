const { required } = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    cartId:{
        type:mongoose.Types.ObjectId,
        ref:'cart'
    },
    email:{
        type:String,
    },
    fullname:{
        type:String,
    },
    phone:{
        type:[String],
        required:true,
    },
    optionalNumber:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:"Nepal",
        required:true,
    },
    
    address:{
        type:String,
        required:true,
    },
    landMark:{
        type:String,
        default:''
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const CustomerModel = new mongoose.model('CustomerDetails', customerSchema)
module.exports = CustomerModel