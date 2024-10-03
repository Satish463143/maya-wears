const Joi = require("joi")
const { Status } = require("../../config/constants.config")
const collectionDTO =({
    name:Joi.string().min(3).max(50).required(),
    decription:Joi.string().min(3).max(50).empty(null, "").optional().default(null),
    status:Joi.string().valid(...Object.values(Status)).required(),
    image:Joi.string().required()

})

module.exports = {collectionDTO}