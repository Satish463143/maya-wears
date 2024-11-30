const ProductModel = require("../product/product.model");
const CartModel = require("./cart.model");

class CartController {
    create= async(req,res,next)=>{
       
        try{
            const { productId, size, quantity } = req.body; 
            const product = await ProductModel.findById(productId)
                       

            if(!product)  {
                console.log("Product ID from request:", productId);
                res.status(404).json({message:"Product not found"})
            }
            const selectedSize = product.sizes.find(s => s.size === size)
            if (!selectedSize) return res.status(400).json({ message: 'Invalid size' });
            if (selectedSize.quantity < quantity)
            return res.status(400).json({ message: 'Insufficient stock' });
            
            const unitPrice = product.price
            const totalAmount = unitPrice * quantity

            let cart = await CartModel.findOne({userId:req.authUser._id})
            if(!cart){
                cart = new CartModel ({
                    userId:req.authUser._id,
                    items:[
                        {productId, size, quantity, price : unitPrice, amount : totalAmount, productImage:product.mainImage}
                    ]
                })
            }else{
                const existingCart = cart.items.find(
                    item => item.productId.toString() === productId && item.size === size
                )
                if(existingCart){
                    existingCart.quantity += quantity;
                    existingCart.amount = existingCart.quantity * existingCart.price                    
                }else{
                    cart.items.push({
                        productId,
                        size,
                        quantity,
                        price:product.price,
                        amount: totalAmount,
                        productImage:product.mainImage
                    })
                }

            }

            await cart.save();   
            res.json({
                result: cart,
                message: "Cart Created ",
                meta:null
            })
        }catch(exception){
            next(exception)
        }
    }
    index= async(req,res,next)=>{
        try{
            const cart = await CartModel.findOne({userId:req.authUser._id}).populate('items.productId', 'name price mainImage slug')
            if(!cart) return res.status(404).json({message:"Cart is Empty"})
            res.json({
                result: cart,
                message: "Cart list ",
                meta:null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    delete= async(req,res,next)=>{
        try{
            const cart = await CartModel.findOne({userId:req.authUser._id})
            if (!cart) return res.status(404).json({message:"Cart not found"})
            
            cart.items = cart.items.filter(item=> item._id.toString() !== req.params.id)

            await cart.save().catch(err => {
                console.error("Error saving cart:", err);
            });
            res.json({
                result: cart,
                message: "Cart deleted ",
                meta:null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
}

module.exports = new CartController