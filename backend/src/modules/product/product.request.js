const Joi = require("joi");
const { Wearable } = require("../../config/constants.config");

const sizeDTO = Joi.object({
    size: Joi.string().min(1).max(5).required(), // Example: "M", "L"
    quantity: Joi.number().integer().min(0).required(), // Non-negative integer
});

const productDTO = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    summary: Joi.string().allow(null, "").optional(),
    description: Joi.string().allow(null, "").optional(),
    promoCode: Joi.string().allow(null, "").optional(),
    discount:Joi.number().allow(null, "").optional(),
    color: Joi.string().allow(null, "").optional(),
    fabric: Joi.string().allow(null, "").optional(),
    pattern: Joi.string().allow(null, "").optional(),
    price: Joi.number().min(0).required(),
    sizes: Joi.array().items(sizeDTO).min(1).optional(), // Array of size objects
    wearable: Joi.string()
        .valid(...Object.values(Wearable))
        .required()
        .default(Wearable.BOTH),
    productCollections: Joi.array()
        .optional()
        .default([]),
    isFeatured: Joi.boolean().required().default(false),
    images: Joi.array().items(Joi.string()).min(1).required(), // Validate as array of URLs
    mainImage: Joi.string().required(),
    featureDesktopImage: Joi.string(),
    featureMobileImage: Joi.string(),
    video: Joi.string().allow(null, '').optional(),
});

module.exports = productDTO;
