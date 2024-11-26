const Joi = require("joi");
const { Wearable } = require("../../config/constants.config");

const sizeDTO = Joi.object({
    size: Joi.string().min(1).max(5).required(), // Example: "M", "L"
    quantity: Joi.number().integer().min(0).required(), // Non-negative integer
});
const productDTO = Joi.object({
    title: Joi.string().min(3).max(50).required(), // Mandatory field
    summary: Joi.string().allow(null, "").optional(), // Optional, can be null or empty
    description: Joi.string().allow(null, "").optional(),
    promoCode: Joi.string().allow(null, "").optional(), // Corrected to explicitly allow optional
    discount: Joi.string().allow(null, "").optional(),
    color: Joi.string().allow(null, "").optional(),
    fabric: Joi.string().allow(null, "").optional(),
    pattern: Joi.string().allow(null, "").optional(),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a valid number.',
        'number.min': 'Price must be greater than or equal to 0.',
        'any.required': 'Price is required.',
    }), // Mandatory field
    sizes: Joi.array().items(sizeDTO).min(1).required(), // Optional array
    wearable: Joi.string()
        .valid(...Object.values(Wearable))
        .optional()
        .default(Wearable.BOTH), // Optional, with a default value
    productCollections: Joi.array().items(Joi.string()).optional().default([]), // Optional array
    isFeatured: Joi.boolean().optional().default(false), // Optional boolean
    images: Joi.array().items(Joi.string()).optional().min(1), // Optional array of URLs
    mainImage: Joi.string().optional(), // Optional
    featureDesktopImage: Joi.string().optional(),
    featureMobileImage: Joi.string().optional(),
    video: Joi.string().allow(null, "").optional(), // Optional
});

 const productUpdateDTO = Joi.object({
    title: Joi.string().min(3).max(50), // Mandatory field
    summary: Joi.string().allow(null, "").optional(), // Optional, can be null or empty
    description: Joi.string().allow(null, "").optional(),
    promoCode: Joi.string().allow(null, "").optional(), // Corrected to explicitly allow optional
    discount: Joi.string().allow(null, "").optional(),
    color: Joi.string().allow(null, "").optional(),
    fabric: Joi.string().allow(null, "").optional(),
    pattern: Joi.string().allow(null, "").optional(),
    price: Joi.number().min(0).messages({
        'number.base': 'Price must be a valid number.',
        'number.min': 'Price must be greater than or equal to 0.',
        'any.required': 'Price is required.',
    }), // Mandatory field
    sizes: Joi.array().items(sizeDTO).min(1), // Optional array
    wearable: Joi.string()
        .valid(...Object.values(Wearable))
        .optional()
        .default(Wearable.BOTH), // Optional, with a default value
    productCollections: Joi.array().items(Joi.string()).optional().default([]), // Optional array
    isFeatured: Joi.boolean().optional().default(false), // Optional boolean
    images: Joi.array().items(Joi.string()).optional().min(1), // Optional array of URLs
    mainImage: Joi.string().optional(), // Optional
    featureDesktopImage: Joi.string().optional(),
    featureMobileImage: Joi.string().optional(),
    video: Joi.string().allow(null, "").optional(), // Optional
});

module.exports = {productDTO, productUpdateDTO};
