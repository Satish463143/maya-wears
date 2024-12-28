const slugify = require("slugify");
const { uploadImage, uploadVideo } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
const productService = require("./product.service");
class ProductController {

    productDetails;

    create = async (req, res, next) => {
        try {
            const data = req.body;
            if (req.files.images) {
                data.images = await Promise.all(
                    req.files.images.map(file =>
                        uploadImage('./public/uploads/product/' + file.filename)
                    )
                );
            } else {
                throw new Error('"images" field is required and must be an array of files');
            }

            if (req.files.mainImage) {
                data.mainImage = await uploadImage('./public/uploads/product/' + req.files.mainImage[0].filename);
            }

            if (req.file) {
                data.video = await uploadVideo('./public/uploads/product/' + req.file.filename);
            }


            // Generate slug
            data.slug = slugify(data.title, { lower: true });

            // Assign the authenticated user's ID
            data.createdBy = req.authUser._id;

            // Save the product to the database
            const product = await productService.createProduct(data);


            //delete the files from the backend after saved in db
            const allFiles = [
                ...(req.files.images || []),
                ...(req.files.mainImage || []),
            ];

            // Include the video file if present
            if (req.file) {
                allFiles.push(req.file);
            }

            for (const file of allFiles) {
                await deleteFile('./public/uploads/product/' + file.filename);
            }

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
            const list = await productService.listData();
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
            const id = req.params.id
            await this.#validate(id)
            const data = req.body
            
            console.log('images', req.files.images)

            if (req.files?.images?.length > 0) {
                data.images = await Promise.all(
                    req.files.images.map(file =>
                        uploadImage('./public/uploads/product/' + file.filename)
                    )
                );
            } else if (!data.images || data.images.length === 0) {
                // Allow no change to `images` if it's not present in `req.body` or `req.files`
                delete data.images;
            }

            if (req.files?.mainImage?.[0]) {
                data.mainImage = await uploadImage('./public/uploads/product/' + req.files.mainImage[0].filename);
            }
    
            // Process video if provided
            if (req.files?.video?.[0]) {
                data.video = await uploadVideo('./public/uploads/product/' + req.files.video[0].filename);
            }
            const response = await productService.updateProduct(data, id);
            // Clean up uploaded files
                const allFiles = [
                    ...(req.files?.images || []),
                    ...(req.files?.mainImage || []),
                    ...(req.files?.video || []),
                ];

                for (const file of allFiles) {
                    await deleteFile('./public/uploads/product/' + file.filename);
                }

            res.json({
                result:response,
                message:"product updated sucessfully",
                meta:null
            })
        }
        catch (exception) {
            console.log('update',exception)
            next(exception)
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