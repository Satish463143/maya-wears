const Joi = require("joi")
const { Status, BannerCategory } = require("../../config/constants.config")
const BannerCreateDTO =  Joi.object({
    title:Joi.string().min(3).max(100).required(),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    status:Joi.string().valid(...Object.values(Status)).required(),
    category:Joi.string().valid(...Object.values(BannerCategory)).required(),
    content:Joi.string().optional().default(null),
    desktopImage:Joi.string(),
    mobileImage:Joi.string(),
    mobileVideo:Joi.string(),
    desktopVideo:Joi.string(),
})
const BannerUpdateDTO =  Joi.object({
    title:Joi.string().min(3).max(100).required(),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    status:Joi.string().valid(...Object.values(Status)).required(),
    category:Joi.string().valid(...Object.values(BannerCategory)).required(),
    content:Joi.string().optional().default(null),
    desktopImage:Joi.string(),
    mobileImage:Joi.string(),
    mobileVideo:Joi.string(),
    desktopVideo:Joi.string(),

})
module.exports = BannerCreateDTO
module.exports = BannerUpdateDTO
