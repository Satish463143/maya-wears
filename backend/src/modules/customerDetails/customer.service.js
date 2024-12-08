const CustomerModel = require("./customer.model")

class CustomerService {
    createCustomer = async(data)=>{
        try{
            const response = new CustomerModel(data)
            return await response.save()

        }catch(exception){
            console.log(exception)
            throw exception
        }
    }
    listData = async ({ skip = 0, limit = 0, filter = {} } = {}) => {
        try {
            const count = await CustomerModel.countDocuments(filter);
            const data = await CustomerModel.find(filter)
                .sort({ _id: "desc" })
                .limit(limit)
                .skip(skip);
            return { count, data };
        } catch (exception) {
            throw exception;
        }
    };
    getIdbyFilter = async (filter) => {
        try {
            const customerDetails = await CustomerModel.findOne(filter)
            return customerDetails

        } catch (exception) {
            throw exception
        }

    }
    updateDetails = async(data,id)=>{
        try{
            const response = await CustomerModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            return response

        }catch(exception){
            throw exception
        }

    }
}

module.exports = new CustomerService