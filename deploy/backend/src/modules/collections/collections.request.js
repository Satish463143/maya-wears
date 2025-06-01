const Joi = require("joi")
const { Status,BannerCategory } = require("../../config/constants.config")
const collectionDTO = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).empty(null, "").optional().default(null),
    status: Joi.string().valid(...Object.values(Status)).required(),
    category:Joi.string().valid(...Object.values(BannerCategory)).required(),
    desktopImage:Joi.string(),
    mobileImage:Joi.string(),
    mobileVideo:Joi.string(),
    desktopVideo:Joi.string(),

})
const collectionUpdateDTO = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).empty(null, "").optional().default(null),
    status: Joi.string().valid(...Object.values(Status)).required(),
    category:Joi.string().valid(...Object.values(BannerCategory)).required(),
    desktopImage:Joi.string(),
    mobileImage:Joi.string(),
    mobileVideo:Joi.string(),
    desktopVideo:Joi.string(),
})



module.exports = {
    collectionDTO,
    collectionUpdateDTO
};