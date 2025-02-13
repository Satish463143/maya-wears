const Joi = require("joi")
const { Status } = require("../../config/constants.config")
const promoDTO = Joi.object({
    promoName:Joi.string().min(2).max(50).required(),
    promoCode:Joi.string().required(),
    discount:Joi.number().required(),
    validFrom:Joi.date().required(),
    validTo:Joi.date().required(),
})
const promoUpdateDTO = Joi.object({
    promoName:Joi.string().min(2).max(50),
    promoCode:Joi.string(),
    discount:Joi.number(),
    validFrom:Joi.date(),
    validTo:Joi.date(),
})
module.exports = {promoDTO, promoUpdateDTO}