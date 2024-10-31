const Joi = require("joi")
const { Status } = require("../../config/constants.config")
const collectionDTO = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).empty(null, "").optional().default(null),
    status: Joi.string().valid(...Object.values(Status)).required(),
    image: Joi.string().required()

})
const collectionUpdateDTO = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).empty(null, "").optional().default(null),
    status: Joi.string().valid(...Object.values(Status)).required(),
    image: Joi.string().optional()

})



module.exports = {
    collectionDTO,
    collectionUpdateDTO
};