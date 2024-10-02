const { deleteFile } = require("../utilies/helper")


const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body
            if (req.file) {
                data[req.file.fieldname] = req.file.filename
            }

            await schema.validateAsync(data, { abortEarly: false })
            next();
        }
        catch (exception) {
            const detail = {};

            //file delete
            if (req.file) {
                console.log(req.file)
                deleteFile("./" + req.file.path)
            }

            exception.details.map((error) => {
                console.log(error)
                detail[error["path"][0]] = error.message
            })
            next({
                status: 400,
                details: detail
            })
        }
    }
}

module.exports = {
    bodyValidator
}