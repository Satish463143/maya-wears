const Joi = require("joi")
const { Status } = require("../../config/constants.config")

const featuredProductDTO = Joi.object({
    title:Joi.string().min(2).max(50).required().messages({
        "string.empty": "Title is required",
    }),
    subTitle:Joi.string().allow(null, "").optional(),
    status: Joi.string().valid(...Object.values(Status)).required(),
    link:Joi.string().required().messages({
        "string.empty": "Link is required",
    }),
    desktopImage:Joi.string().required().messages({
        "string.empty": "Desktop image is required",
    }),
    mobileImage:Joi.string().required().messages({
        "string.empty": "Desktop image is required",
    }),
})
const featuredProductUpdateDTO = Joi.object({
    title:Joi.string().min(2).max(50).required().messages({
        "string.empty": "Title is required",
    }),
    subTitle:Joi.string().allow(null, "").optional(),
    status: Joi.string().valid(...Object.values(Status)).required(),
    link:Joi.link().required().messages({
        "string.empty": "Link is required",
    }),
    desktopImage:Joi.string().optional(),
    mobileImage:Joi.string().optional(),
})

module.exports = {
    featuredProductDTO,
    featuredProductUpdateDTO
}