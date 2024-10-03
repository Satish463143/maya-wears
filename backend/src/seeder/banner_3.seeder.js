require("../config/db.config")
const { BannerCategory } = require("../config/constants.config");
const Banner_3Model = require("../modules/banner_3/banner_3.model");



const  Banner_3Data =[{
    title:"This is a title",
    content:"Welcome to the website",
    link:"http://www.gooogle.com",
    category:BannerCategory.IMAGE,
    desktopImage: "", // Leave empty or null
    mobileImage: "",
    desktopVideo: "",
    mobileVideo: "",
}]

const seedBanner_3 = async()=>{
    try{
        await Promise.all(
            Banner_3Data.map(async (Banner_3) => {
                const existingBanner_3 = await Banner_3Model.findOne();
                if(!existingBanner_3){
                    const banner_3Obj = new Banner_3Model(Banner_3)
                    await banner_3Obj.save()
                    console.log("Banner_3 seeded successfully");
                }
            })
        )
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
}

seedBanner_3()