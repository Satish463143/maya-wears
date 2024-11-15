const Joi = require("joi");
const { Wearable } = require("../../config/constants.config");

const sizeDTO = Joi.object({
    size: Joi.string().min(1).max(5).required(), // e.g., "M", "L", etc.
    quantity: Joi.number().integer().min(0).required() // quantity as a non-negative integer
});
const productDTO= Joi.object({
    title:Joi.string().min(3).max(50).required(),
    summary:Joi.string().empty(null, "").optional().default(null),
    description:Joi.string().empty(null, "").optional().default(null),
    promoCode:Joi.string().empty(null, "").optional().default(null),
    color:Joi.string().empty(null, "").optional().default(null),
    fabric:Joi.string().empty(null, "").optional().default(null),
    pattern:Joi.string().empty(null, "").optional().default(null),
    price:Joi.number().required(),
    sizes:Joi.array().items(sizeDTO).min(1).required(),
    wearable:Joi.string().valid(...Object.values(Wearable)).required().default(Wearable.BOTH),
    productCollections:Joi.array().items(Joi.string().hex().length(24)).optional(),
    isFeatured:Joi.boolean().required().default(false),
    images:Joi.array().required(),
    video:Joi.string().empty(null, '').optional().default(null)    

})

module.exports = productDTO;