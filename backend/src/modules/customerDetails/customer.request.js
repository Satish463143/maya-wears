const Joi = require("joi");

const customerUpdateDTO = Joi.object({
    fullname: Joi.string()
        .min(2)
        .max(50)
        .when(Joi.ref("$isLoggedIn"), {
            is: true,
            then: Joi.optional(),
            otherwise: Joi.required().messages({
                "string.empty": "Fullname is required field",
            }),
        }),
    email: Joi.string().email().allow(null, "").optional(),
    phone: Joi.string()
        .min(10)
        .max(13)
        .pattern(/^\d+$/)
        .when(Joi.ref("$isLoggedIn"), {
            is: true,
            then: Joi.optional(),
            otherwise: Joi.required().messages({
                "string.empty": "Phone is required field",
            }),
        }),
    country: Joi.string().messages({
        "string.empty": "Country is required",
    }),
    address: Joi.string().messages({
        "string.empty": "Address is required",
    }),
    landMark: Joi.string().allow(null, "").optional(),
    optionalNumber: Joi.string().min(10).max(13).allow(null, "").optional(),
});
const customerCreateDTO = Joi.object({
    fullname: Joi.string()
        .min(2)
        .max(50)
        .required(),
    email:Joi.string().allow(null, "").optional(),
    phone: Joi.string().required().messages({
        "string.empty": "Phone is required",
    }),
    country: Joi.string().required().messages({
        "string.empty": "Country is required",
    }),
    address: Joi.string().required().messages({
        "string.empty": "Address is required",
    }),
    landMark: Joi.string().allow(null, "").optional(),
    optionalNumber: Joi.string().min(10).max(13).allow(null, "").optional(),
});

module.exports = { customerCreateDTO, customerUpdateDTO };
