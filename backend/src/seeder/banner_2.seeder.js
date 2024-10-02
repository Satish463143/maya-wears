require("../config/db.config")
const { BannerCategory } = require("../config/constants.config");
const Banner_2Model = require("../modules/banner_2/banner_2.model");



const  Banner_2Data =[{
    title:"This is a title",
    content:"Welcome to the website",
    link:"http://www.gooogle.com",
    category:BannerCategory.IMAGE,
    desktopImage: "", // Leave empty or null
    mobileImage: "",
    desktopVideo: "",
    mobileVideo: "",
}]

const seedBanner_2 = async()=>{
    try{
        await Promise.all(
            Banner_2Data.map(async (Banner_2) => {
                const existingBanner_2 = await Banner_2Model.findOne();
                if(!existingBanner_2){
                    const banner_2Obj = new Banner_2Model(Banner_2)
                    await banner_2Obj.save()
                    console.log("Banner_2 seeded successfully");
                }
            })
        )
        process.exit(1)
    } catch (exception) {
        console.log(exception);
    }
}

seedBanner_2()