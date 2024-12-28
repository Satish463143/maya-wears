const featuredProductService = require("./featuredProduct.service");
const { uploadImage } = require("../../config/cloudinary.config");
const { deleteFile } = require("../../utilies/helper");
const slugify = require("slugify")
const { Status } = require("../../config/constants.config");


class featuredProductController  {
    featuredProductDetails;
    create = async(req,res,next)=>{     
        try{
            const data = req.body

            if (req.files.desktopImage) {
                data.desktopImage = await uploadImage(req.files.desktopImage[0].path);
            }
            if (req.files.mobileImage) {
                data.mobileImage = await uploadImage(req.files.mobileImage[0].path);
            }

            //slug
            data.slug = slugify(data.title, { lower: true })

            data.createdBy = req.authUser._id

            const product = await featuredProductService.createProduct(data)

            const allFiles = [
                ...(req.files?.desktopImage || []),
                ...(req.files?.mobileImage || []),
            ];

            for (const file of allFiles) {
                await deleteFile('./public/uploads/FeaturedProduct/' + file.filename);
            }

            res.json({
                result:product,
                message:"Featured Product craeted",
                meta:null
            })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
    index = async(req,res,next)=>{
        try {
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1
            const skip = (page - 1) * limit

            let filter = {}
            if (req.query.search) {
                filter = {
                    status: new RegExp(req.query.search, "i")
                }
            }
            const { data, count } = await featuredProductService.listdata({
                skip: skip,
                limit: limit,
                filter: filter,

            })
            res.json({
                result: data,
                message: "List of feeatuerd product",
                meta: {
                    currentPage: page,
                    total: count,
                    limit: limit
                }
            })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
    #validate = async (id) => {
            try {
                if (!id) {
                    throw { status: 400, message: "Id is required" }
                }
                this.featuredProductDetails = await featuredProductService.getIdbyFilter({
                    _id: id
                })
    
                if (!this.featuredProductDetails) {
                    throw { status: 400, message: "Product Doesn't Exit" }
                }
            } catch (exception) {
                throw exception
            }
    
        }
    show = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)
            res.json({
                result: this.featuredProductDetails,
                message: "Product fetched By Id",
                meta: null
            })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
    update = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)
            const data = req.body

            if (req.files.desktopImage) {
                data.desktopImage = await uploadImage('./public/uploads/FeaturedProduct/' + req.files.desktopImage[0].filename);
            }
            if (req.files.mobileImage) {
                data.mobileImage = await uploadImage('./public/uploads/FeaturedProduct/' + req.files.mobileImage[0].filename);
            }
            const allFiles = [
                ...(req.files.images || []),
                ...(req.files.mainImage || []),
            ];
            for (const file of allFiles) {
                await deleteFile('./public/uploads/product/' + file.filename);
            }
            const response = await featuredProductService.updateFeaturedproduct(data, id)
            res.json({
                result: response,
                meessage: "product Updated Sucessfully",
                meta: null
            })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
    delete = async(req,res,next)=>{
        try{
            const id = req.params.id
            await this.#validate(id)

            const response = await featuredProductService.deleteFeaturedProduct(id)
            res.json({
                result: response,
                message: "product deleted Sucessfuly",
                meta: null
            })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
    listForHome = async(req,res,next)=>{
        try{
            const list = await featuredProductService.listdata({
            limit: 7,
            filter: {
                status: Status.ACTIVE
            }
        })
        res.json({
            result: list,
            message: "List of active product",
            meta: null
        })

        }catch(exception){
            next(exception)
            console.log(exception)

        }
    }
}
module.exports = new featuredProductController