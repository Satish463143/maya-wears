const Joi = require("joi");

const UserCreateDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    phone: Joi.string().min(10).max(13).required(), // Fixed typo 'phonr' to 'phone'
    password: Joi.string().min(8)
    .max(16)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,16}$/) // Corrected regex
    .required()
    .messages({
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one special symbol, and one number."
    }),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only":"Password and confirmPassword must match"
    }),
    // image: Joi.string(),
    // role:Joi.string().regex(/^(seller|customer|admin)$/).required().messages({
    //     "string.pattern.base":"choose a given role"
    // })

});

module.exports = {
    UserCreateDTO // Fixed typo from 'UserCraeteDTO' to 'UserCreateDTO'
};
