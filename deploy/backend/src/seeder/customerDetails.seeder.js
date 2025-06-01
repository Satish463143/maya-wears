require("../config/db.config")
const CustomerModel = require("../modules/customerDetails/customer.model");


const customerData   = [{
    email:"",
    fullname:"",
    phone:"",
    country:"",
    province:"",
    city:"",
    address:"",
    landMark:"",
    postalCode:"",
}]

const seedCustomer = async()=>{
    try{
        await Promise.all(
            customerData.map(async (CustomerDeatils) => {
                const existingDeatils = await CustomerModel.findOne();
                if(!existingDeatils){
                    const custmerObj = new CustomerModel(CustomerDeatils)
                    await custmerObj.save()
                    console.log("customer seeded successfully");
                }
            })
        )
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
}

seedCustomer()