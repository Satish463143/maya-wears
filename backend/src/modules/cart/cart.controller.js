const ProductModel = require("../product/product.model");
const CartModel = require("./cart.model");

class CartController {
    create= async(req,res,next)=>{
       
        try{
            const { productId, size, quantity } = req.body; 
            const product = await ProductModel.findById(productId)                       

            if(!product)  {
                res.status(404).json({message:"Product not found"})
            }
            const selectedSize = product.sizes.find(s => s.size === size)
            if (!selectedSize) return res.status(400).json({ message: 'Invalid size' });
            if (selectedSize.quantity < quantity)
            return res.status(400).json({ message: 'Insufficient stock' });
            
            const unitPrice = product.price
            const totalAmount = unitPrice * quantity


            const userId = req.authUser ? req.authUser._id : req.cookies.cartId;

            let cart;
            if (userId) {
                cart = await CartModel.findOne({ userId });
            } else {
                // For anonymous users, use cartId from cookies (or localStorage on frontend)
                cart = await CartModel.findOne({ cartId: req.cookies.cartId });
            }
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
            const userId = req.authUser ? req.authUser._id : req.cookies.cartId;

            if (!userId) {
                return res.status(400).json({ message: "No cart found" });
            }

            const cart = await CartModel.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
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
    
            const cartId = req.authUser ? req.authUser._id : req.cookies.cartId; // Check for logged-in user or anonymous user
    
            // Find the cart for the logged-in user or anonymous user
            const cart = await CartModel.findOne({ userId: cartId });
            if (!cart) return res.status(404).json({ message: "Cart not found" });
    
            // Find the cart item by id
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
    
    
    
    delete = async (req, res, next) => {
        try {
            const { cartId } = req.body; // For anonymous users
            const cartItemId = req.params.id;
    
            let cart;
            if (cartId) {
                // If cartId exists (anonymous user), find the cart using cartId
                cart = await CartModel.findOne({ cartId });
            } else if (req.authUser) {
                // If the user is logged in, find the cart using userId
                cart = await CartModel.findOne({ userId: req.authUser._id });
            }
    
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            // Remove the item from the cart
            cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);
    
            await cart.save();
            res.json({
                result: cart,
                message: "Cart item deleted",
                meta: null
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    }
    
    
}

module.exports = new CartController