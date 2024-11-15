const slugify = require("slugify");
const { uploadImage, uploadVideo } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
const productService = require("./product.service");
class ProductController {

    productDetails;

    create = async(req, res, next)=>{
        try{
            const data = req.body

            if (req.files && req.files.length > 0) {
                data.images = await Promise.all(
                    req.files.map(file => uploadImage('./public/uploads/product/' + file.filename))
                );
            }

            data.video = await uploadVideo('./public/uploads/product/' + req.file.filename)

            data.slug = slugify(data.title, {lower:true})

            deleteFile('./public/uploads/product/' + req.file.filename)
            data.createdBy = req.authUser._id

            const product  = await productService.createProduct(data)

            res.json({
                result:product,
                message:"product Created",
                meta:null
            })

        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    index = async(req, res, next)=>{
        try{
            const page = req.query.page || 1
            const limit = +req.query.limit || 10
            const skip = (page - 1) * limit

            let filter = {}

            if(req.query.search){
                filter={
                    title: new RegExp(req.query.search, 'i')
                }
            }

            const {count, data} = await productService.listData({
                skip:skip,
                filter:filter,
                limit:limit
            })

            res.json({
                result:data,
                message:"List of all product",
                meta:{
                    currentPage:page,
                    total:count,
                    limit:limit,

                }
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    show = async(req, res, next)=>{
        try{

        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    update = async(req, res, next)=>{
        try{

        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
    delete = async(req, res, next)=>{
        try{

        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
}

module.exports = new ProductController