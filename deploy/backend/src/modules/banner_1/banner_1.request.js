const Joi = require("joi")
const {BannerCategory } = require("../../config/constants.config")
const Banner_1UpdateDTO =  Joi.object({
    title:Joi.string().min(3).max(100).required(),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    button:Joi.string().empty(null,"").optional().default(null),
    category:Joi.string().valid(...Object.values(BannerCategory)).required(),
    content:Joi.string().optional().default(null),
    desktopImage:Joi.string(),
    mobileImage:Joi.string(),
    mobileVideo:Joi.string(),
    desktopVideo:Joi.string(),

})
module.exports = Banner_1UpdateDTO