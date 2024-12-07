require("dotenv").config();
const mongoose = require("mongoose")

mongoose.set('strictPopulate', false);

mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.MONGODB_NAME,
    autoCreate:true,
    autoIndex:true,

}).then(()=>{
    console.log("Database connected sucessfuly")
})
.catch((err)=>{
    console.log(err)
    process.exit(1)
})