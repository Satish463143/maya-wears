const Joi = require("joi")
const { BannerCategory } = require("../../config/constants.config")

const banner_2UpdateDTO = Joi.object({
    title:Joi.string().max(50).optional().default(null),
    content:Joi.string().max(100).optional().default(null),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    category:Joi.string().valid(...Object.values(BannerCategory)).optional().default(null),
    desktopImage:Joi.string().empty(null,"").optional().default(null),
    desktopVideo:Joi.string().empty(null,"").optional().default(null),
    mobielVideo:Joi.string().empty(null,"").optional().default(null),
    mobileImage:Joi.string().empty(null,"").optional().default(null),    
})

module .exports = banner_2UpdateDTO