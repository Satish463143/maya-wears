const promoService = require("./promo.service")

 
 class PromoController{
    list= async(req,res,next)=>{
        try{
            const data = await promoService.listData()

            res.json({
                result:data,
                message:'List of promos ',
                meta:null
            })

        }catch(exception){
            next(exception)
            console.log(exception)
        }
    }
 }

module.exports = new PromoController