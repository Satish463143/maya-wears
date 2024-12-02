const { orderStatus } = require("../../config/constants.config");
const CartModel = require("../cart/cart.model");
const ProductModel = require("../product/product.model");
const PromoModel = require("../promo/promo.model");
const OrderModel = require("./Order.model");

class OrderController {
    create = async (req, res, next) => {
        try {
            const { cartId, cartTotal, promoCode } = req.body;
            const cart = await CartModel.findById(cartId)
                .populate("userId")
                .populate("items.productId");

            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const cartTotalNumber = parseFloat(cartTotal);

                // Validate the cart total
                const calculatedSubtotal = cart.items.reduce((sum, item) => {
                    const expectedAmount = item.price * item.quantity; // Calculate expected amount
                    if (item.amount !== expectedAmount) {
                        return res.status(400).json({ 
                            message: `Mismatch in amount for product ${item.title}: expected ${expectedAmount}, got ${item.amount}` 
                        });
                    }
                    return sum + item.amount; // Add the validated amount to the subtotal
                }, 0);

                if (calculatedSubtotal !== cartTotalNumber) {
                    return res.status(400).json({ 
                        message: `Invalid cart total. Expected: ${calculatedSubtotal}, Received: ${cartTotalNumber}` 
                    });
                }

            let discount = 0;

            // Validate the promo code
            if (promoCode) {
                const promo = await PromoModel.findOne({ promoCode });
                if (promo && promo.discount) {
                    const discountPercent = parseFloat(promo.discount); // Ensure discount is a number
                    if (isNaN(discountPercent)) {
                        return res.status(400).json({ message: "Invalid discount value in the promo model" });
                    }
                    discount = (discountPercent / 100) * calculatedSubtotal; // Calculate discount in percentage
                } else {
                    return res.status(400).json({ message: "Invalid or expired promo code" });
                }
            }

            // Calculate service charge, VAT, and total after applying discount
            const discountedSubtotal = calculatedSubtotal - discount;
            const serviceCharge = 0.1 * discountedSubtotal; // 10% service charge
            const vat = 0.13 * discountedSubtotal; // 13% VAT
            const total = discountedSubtotal + serviceCharge + vat;

            // Create a new order
            const newOrder = await OrderModel.create({
                cartId: cart._id,
                userId: cart.userId._id,
                subTotal: calculatedSubtotal,
                discount,
                serviceCharge,
                vat,
                total,
                orderStatus: orderStatus.PENDING, // Default order status
                createdBy: cart.userId._id,
            });

            res.json({
                details: newOrder,
                message: "Order created successfully",
                meta: null,
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };
}


module.exports = new OrderController