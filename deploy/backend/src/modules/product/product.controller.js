const slugify = require("slugify");
const { uploadImage, uploadVideo } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
const productService = require("./product.service");
class ProductController {

    productDetails;

    create = async (req, res, next) => {
        try {
            const data = req.body;
            if (req.files?.images) {
                // Use AWS S3 locations directly
                data.images = req.files.images.map(file => file.location);
            } else {
                throw new Error('"images" field is required and must be an array of files');
            }

            if (req.files?.mainImage && req.files.mainImage.length > 0) {
                data.mainImage = req.files.mainImage[0].location;
            }

            if (req.files?.video && req.files.video.length > 0) {
                data.video = req.files.video[0].location;
            }

            // Generate slug
            data.slug = slugify(data.title, { lower: true });

            // Assign the authenticated user's ID
            data.createdBy = req.authUser._id;

            // Save the product to the database
            const product = await productService.createProduct(data);

            res.json({
                result: product,
                message: "Product created successfully",
                meta: null,
            });
        } catch (exception) {
            console.error('controller exception', exception);
            next(exception);
        }
    }
    index = async (req, res, next) => {
        try {
            const page = req.query.page || 1
            const limit = +req.query.limit || 10
            const skip = (page - 1) * limit

            let filter = {}

            if (req.query.search) {
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }

            const { count, data } = await productService.listData({
                skip: skip,
                filter: filter,
                limit: limit
            })

            res.json({
                result: data,
                message: "List of all product",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit,

                }
            })
        }
        catch (exception) {
            console.log(exception)
            next(exception)
        }

    }
    listForHome = async (req, res, next) => {
        try {
            let filter = {}

            if (req.query.search) {
                filter = {
                    title: new RegExp(req.query.search, 'i')
                }
            }
            const list = await productService.listData({
                filter:filter
            });
            res.json({
                result: list,
                message: "List of product",
                meta: null,
            });
        } catch (exception) {
            next(exception);
        }
    };
    #validate = async (id) => {
        try {
            if (!id) {
                throw { status: 400, message: "Id is required" }
            }
            this.productDetails = await productService.getIdbyFilter({
                _id: id
            })

            if (!this.productDetails) {
                throw { status: 400, message: "product doesn't Exit" }
            }
        } catch (exception) {
            throw exception
        }

    }

    show = async (req, res, next) => {
        try {
            const id = req.params.id
            await this.#validate(id)
            res.json({
                result: this.productDetails,
                message: "Product fetched By Id",
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            await this.#validate(id);
            const data = req.body;
            
            if (req.files?.images && req.files.images.length > 0) {
                // Use AWS S3 locations directly
                data.images = req.files.images.map(file => file.location);
            } else if (!data.images || data.images.length === 0) {
                // Allow no change to `images` if it's not present in `req.body` or `req.files`
                delete data.images;
            }
            
            if (req.files?.mainImage && req.files.mainImage.length > 0) {
                data.mainImage = req.files.mainImage[0].location;
            }

            if (req.files?.video && req.files.video.length > 0) {
                data.video = req.files.video[0].location;
            }

            const response = await productService.updateProduct(data, id);

            res.json({
                result: response,
                message: "product updated successfully",
                meta: null
            });
        }
        catch (exception) {
            console.log('update', exception);
            next(exception);
        }
    }
    delete = async (req, res, next) => {
        try {
            const id = req.params.id
            await this.#validate(id)
            const response = await productService.deleteProduct(id)
            res.json({
                result: response,
                message: "Product deleted Sucessfuly",
                meta: null
            })

        }
        catch (exception) {
            next(exception)
        }

    }
}

module.exports = new ProductController