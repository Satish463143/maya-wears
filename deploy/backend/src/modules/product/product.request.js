const Joi = require("joi");
const { Wearable } = require("../../config/constants.config");

const sizeDTO = Joi.object({
    size: Joi.string().min(1).max(5).required(), // Example: "M", "L"
    quantity: Joi.number().integer().min(0).required(), // Non-negative integer
});
const productDTO = Joi.object({
    title: Joi.string().min(3).max(50).required(), // Mandatory field
    materailCare: Joi.string().allow(null, "").optional(), // Optional, can be null or empty
    description: Joi.string().allow(null, "").optional(),
    fit: Joi.string().allow(null, "").optional(),
    modelSize: Joi.string().allow(null, "").optional(),
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
    
    images: Joi.array().items(Joi.string()).optional().min(1), // Optional array of URLs
    mainImage: Joi.string().optional(), // Optional
    video: Joi.string().allow(null, "").optional(), // Optional
});

 const productUpdateDTO = Joi.object({
    title: Joi.string().min(3).max(50),
    description: Joi.string().allow(null, "").optional(),
    fit: Joi.string().allow(null, "").optional(),
    modelSize: Joi.string().allow(null, "").optional(),
    materailCare: Joi.string().allow(null, "").optional(),
    color: Joi.string().allow(null, "").optional(),
    fabric: Joi.string().allow(null, "").optional(),
    pattern: Joi.string().allow(null, "").optional(),
    price: Joi.number().min(0).messages({
        'number.base': 'Price must be a valid number.',
        'number.min': 'Price must be greater than or equal to 0.',
        'any.required': 'Price is required.',
    }), // Mandatory field
    sizes: Joi.array().items(sizeDTO).min(1), 
    wearable: Joi.string()
        .valid(...Object.values(Wearable))
        .optional()
        .default(Wearable.BOTH), 
    productCollections: Joi.array().items(Joi.string()).optional().default([]), 
    images: Joi.array()
    .items(Joi.string())
    .optional().min(1)
    .messages({
        "array.base": '"images" must be an array',
    }),
    mainImage: Joi.string().optional(), // Optional
    video: Joi.string().allow(null, "").optional(), // Optional
});

module.exports = {productDTO, productUpdateDTO};
