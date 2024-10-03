require("../config/db.config")
const { BannerCategory } = require("../config/constants.config");
const Banner_1Model = require("../modules/banner_1/banner_1.model");



const  Banner_1Data =[{
    title:"This is a title",
    content:"Welcome to the website",
    link:"http://www.gooogle.com",
    category:BannerCategory.IMAGE,
    desktopImage: "", // Leave empty or null
    mobileImage: "",
    desktopVideo: "",
    mobileVideo: "",
}]


const seedBanner_1 = async()=>{
    try{
        await Promise.all(
            Banner_1Data.map(async (Banner_1) => {
                const existingBanner_1 = await Banner_1Model.findOne();
                if(!existingBanner_1){
                    const banner_1Obj = new Banner_1Model(Banner_1)
                    await banner_1Obj.save()
                    console.log("Banner_1 seeded successfully");
                }
            })
        )
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
}

seedBanner_1()