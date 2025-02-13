const { Status } = require("../../config/constants.config");
const PromoModel = require("./promo.model");
const promoService = require("./promo.service")

 
 class PromoController{
    promorDetails;
    create = async(req,res,next)=>{
        try{
            const data = req.body

            const currentDate = new Date()
            if (data.validTo) {
                data.status = new Date(data.validTo) >= currentDate ? Status.ACTIVE : Status.INACTIVE;
              }

            const response = await promoService.createPromo(data)

            res.json({
                result:response,
                message:"promo created",
                meta:null
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    list= async(req,res,next)=>{
        try{
            const limit = req.limit || 10
            const page = req.page || 1
            const skip = (page-1)* limit

            let filter = {}

            if (req.query.search) {
                filter = {
                    promoName: new RegExp(req.query.search, 'i')
                }
            }
            const {count,data} = await promoService.listData({
                skip:skip,
                limit:limit,
                filter:filter
            })
            res.json({
                result:data,
                message:'List of promos ',
                meta:{
                    currentPage:page,
                    total:count,
                    limit:limit
                }
            })        

        }catch(exception){
            next(exception)
            console.log(exception)
        }
    }
     #validate = async (id) => {
            try {
                if (!id) {
                    throw { status: 400, message: "Id is required" }
                }
                this.promorDetails = await promoService.getIdbyFilter({
                    _id: id
                })
    
                if (!this.promorDetails) {
                    throw { status: 400, message: "promo Doesn't Exit" }
                }
            } catch (exception) {
                throw exception
            }
    
        }
    showById = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)

            res.json({
                result: this.promorDetails,
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

            const currentDate = new Date()
            if (data.validTo) {
                data.status = new Date(data.validTo) >= currentDate ? Status.ACTIVE : Status.INACTIVE;
              }
            const response  = await promoService.updateDetails(data, id)            

            res.json({
                deatils:response,
                message:"Updated promo details",
                meta:null
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    delete = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)

            const response = await promoService.deleteById(id)

            // delete from cloudinary

            res.json({
                result:response,
                message:"Banner deletedd sucessfully",
                meta: null
            })
            
        }catch(exception){
            next(exception)

        }
    }
    applyPoromo =async (req,res,next)=>{
        try{
            const {promoCode} = req.body
            const promo = await PromoModel.findOne({promoCode})
            if(!promo){
                return res.status(404).json({
                    message:"Promo doesn't exist",
                    discount:0
                })
            }
            if (promo.status !== Status.ACTIVE) {
                return res.status(400).json({
                    message: 'Promo code is inactive or expired',
                    discount: 0
                });
            }
            return res.json({
                message: 'Promo code applied successfully',
                discount: promo.discount
            });


        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
 }

module.exports = new PromoController