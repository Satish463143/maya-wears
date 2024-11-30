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
                        {productId, size, quantity, title:product.title, price : unitPrice, amount : totalAmount, productImage:product.mainImage,}
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
                        productImage:product.mainImage,
                        title:product.title,
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

    edit = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { size, quantity } = req.body;
    
            // Find the cart item
            const cart = await CartModel.findOne({ "items._id": id });
            if (!cart) return res.status(404).json({ message: "Cart item not found" });
    
            const item = cart.items.find(item => item._id.toString() === id);
            if (!item) return res.status(404).json({ message: "Item not found in cart" });
    
            // Update the item values
            item.size = size;
            item.quantity = quantity;
            item.amount = quantity * item.price; // Recalculate amount
    
            // Save the updated cart
            await cart.save();
    
            res.json({
                result: cart,
                message: "Cart updated",
                meta: null,
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };
    
    
    delete= async(req,res,next)=>{
        try{
            const cart = await CartModel.findOne({userId:req.authUser._id})
            if (!cart) return res.status(404).json({message:"Cart not found"})
            
            cart.items = cart.items.filter(item=> item._id.toString() !== req.params.id)

            await cart.save()
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