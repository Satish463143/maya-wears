require("dotenv").config();
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const ProductModel = require("../product/product.model");
const CartModel = require("./cart.model");
const userSvc = require("../../modules/user/user.service")

class CartController {
    create = async (req, res, next) => {
        try {
            const { productId, size, quantity } = req.body;
            const product = await ProductModel.findById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const selectedSize = product.sizes.find(s => s.size === size);
            if (!selectedSize) {
                return res.status(400).json({ message: "Invalid size" });
            }
            if (selectedSize.quantity < quantity) {
                return res.status(400).json({ message: "Insufficient stock" });
            }

            const unitPrice = product.price;
            const totalAmount = unitPrice * quantity;

            let userId = req.userId;

            let cart = await CartModel.findOne({ userId });

            if (!cart) {
                // Create a new cart if no existing cart
                cart = new CartModel({
                    userId,
                    items: [
                        {
                            productId,
                            size,
                            quantity,
                            title: product.title,
                            price: unitPrice,
                            amount: totalAmount,
                            productImage: product.mainImage,
                        },
                    ],
                });
            } else {
                // Update existing cart
                const existingCart = cart.items.find(
                    item => item.productId.toString() === productId && item.size === size
                );
                if (existingCart) {
                    existingCart.quantity += quantity;
                    existingCart.amount = existingCart.quantity * existingCart.price;
                } else {
                    cart.items.push({
                        productId,
                        size,
                        quantity,
                        price: product.price,
                        amount: totalAmount,
                        productImage: product.mainImage,
                        title: product.title,
                    });
                }
            }

            await cart.save();
            res.json({
                result: cart,
                message: "Cart Created",
                meta: null,
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };
    
    
    index = async (req, res, next) => {
        try {
            const userId = req.userId; 
            const cartId = req.cookies.cartId;
        
             // Fetch the cart based on userId or cartId
            const cart = await CartModel.findOne({
                $or: [
                { userId }, // Match logged-in user's cart
                { _id: cartId }, // Match anonymous user's cart by cartId
                ],
            });
    
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            // Return the cart details
            res.json({
                result: cart,
                message: "Cart list",
                meta: null,
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };   
    

    edit = async (req, res, next) => {
        try {
            const { id } = req.params;
            const {  quantity } = req.body;
    
            const cartId = req.userId // Check for logged-in user or anonymous user
    
            // Find the cart for the logged-in user or anonymous user
            const cart = await CartModel.findOne({ userId: cartId });
            if (!cart) return res.status(404).json({ message: "Cart not found" });
    
            // Find the cart item by id
            const item = cart.items.find(item => item._id.toString() === id);
            if (!item) return res.status(404).json({ message: "Item not found in cart" });
    
            // Update the item values
            // item.size = size;
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
    
    
    
    deleteById = async (req, res, next) => {
        try {
            const cartItemId = req.params.id; // ID of the item to delete
            const userId = req.userId; // Set by authOrAnonymous middleware
    
            // Find the cart (either logged-in user or anonymous user)
            const cart = await CartModel.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            // Check if the item exists in the cart
            const itemExists = cart.items.some(item => item._id.toString() === cartItemId);
            if (!itemExists) {
                return res.status(404).json({ message: "Item not found in cart" });
            }
    
            // Remove the item from the cart
            cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);
    
            // Save the updated cart
            await cart.save();
    
            res.json({
                result: cart,
                message: "Cart item deleted successfully",
                meta: null,
            });
        } catch (exception) {
            console.error("Error in deleting cart item:", exception);
            next(exception);
        }
    };

    deleteByCartId = async(req,res,next)=>{
        try{
            const cartId = req.params.id; // ID of the cart to delete
            const userId = req.userId;

            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                return res.status(400).json({ message: "Invalid cart ID" });
            }
           // Find the cart (either logged-in user or anonymous user)
            const cart = await CartModel.findOne({ userId });
            
             // Delete the cart from the database
            const response = await CartModel.findByIdAndDelete({ _id: cartId, userId });
            if (!response) {
                return res.status(404).json({
                    message: "Cart not found or doesn't belong to the user.",
                });
            }
            res.json({
                details:response,
                message:"cart deleted sucessfully",
                meta:null
            })

        }catch(exception){
            next(exception)
            console.log(exception)
        }
    }
    
    
    
}

module.exports = new CartController