const Joi = require("joi")
const { Status } = require("../../config/constants.config")
const BannerCreateDTO =  Joi.object({
    title:Joi.string().min(3).max(100).required(),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    status:Joi.string().valid(...Object.values(Status)).required(),
    image:Joi.string().required()

})
const BannerUpdateDTO =  Joi.object({
    title:Joi.string().min(3).max(100).required(),
    link:Joi.string().uri().empty(null,"").optional().default(null),
    status:Joi.string().valid(...Object.values(Status)).required(),
    image:Joi.string().optional()

})
module.exports = BannerCreateDTO
module.exports = BannerUpdateDTO
