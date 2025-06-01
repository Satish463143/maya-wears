const customerService = require("./customer.service")

class CustomerController {
    customerDetails;
    create = async(req,res,next)=>{
        try{
            const data = req.body

            if (req.authUser) {
                data.userId = req.authUser.id;
                data.fullname = data.name || req.authUser.name; // Use provided fullname or default to user's name
                data.email = data.email || req.authUser.email;         // Use provided email or default to user's email
                data.phone = data.phone || req.authUser.phone; 
            } else {
                data.userId = req.userId; // For anonymous users, use cartId
            }            
            const customer = await customerService.createCustomer(data)            

            res.json({
                deatils:customer,
                message:"created customer details",
                meta:null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    index = async(req,res,next)=>{
        try{
            const limit = req.limit || 10
            const page = req.page || 1
            const skip = (page-1)* limit

            let filter = {}

            if (req.query.search) {
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }

            const { count, data } = await customerService.listData({
                skip: skip,
                filter: filter,
                limit: limit
            })
               
            

            res.json({
                deatils:data,
                message:"list of cusstomer details",
                meta:{
                    currentPage:page,
                    limit:limit,
                    total:count
                }
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    #validate = async (id) => {
        try {
            if (!id) {
                throw { status: 400, message: "Id is required" }
            }
            this.customerDetails = await customerService.getIdbyFilter({
                _id: id
            })

            if (!this.customerDetails) {
                throw { status: 400, message: "product Doesn't Exit" }
            }
        } catch (exception) {
            throw exception
        }

    }
    show = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)

            res.json({
                result: this.customerDetails,
                message: "Customer fetched By Id",
                meta: null
            })
            
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    update = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)

            const data = req.body

            const response  = await customerService.updateDetails(data, id)            

            res.json({
                deatils:response,
                message:"Update customer details",
                meta:null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    
}
module.exports = new CustomerController