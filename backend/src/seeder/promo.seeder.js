require("../config/db.config")
const PromoModel = require("../modules/promo/promo.model");

const promoData   = [{
    promoCode: "Summer20",
    discount:"20",
    validFrom:"",
    validTo:""
}]

const seedPromo = async()=>{
    try{
        await Promise.all(
            promoData.map(async (Promo) => {
                const existingPromo = await PromoModel.findOne();
                if(!existingPromo){
                    const promoObj = new PromoModel(Promo)
                    await promoObj.save()
                    console.log("promo seeded successfully");
                }
            })
        )
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
}

seedPromo()