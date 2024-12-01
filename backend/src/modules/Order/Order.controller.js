const CartModel = require("../cart/cart.model")

class OrderController {
    create = async(req,res,next)=>{

        try{
            const { cartId, cartTotal, promoCode, serviceCharge = 0, vat = 0 } = req.body;
            const cart = await CartModel.findById(cartId).populate("userId")

            if(!cart) {
                return res.status(404).json({message:"Cart not found"})
            }
            // Validate the cart total
            const calculatedSubtotal = cart.items.reduce((sum, item) => sum + item.amount, 0);
            if (calculatedSubtotal !== cartTotal) {
                return res.status(400).json({ message: "Invalid cart total" });
            }

            let discount = 0;
            if (promoCode) {
                const promo = await PromoModel.findOne({ code: promoCode });
                if (!promo || promo.expiryDate < new Date()) {
                    return res.status(400).json({ message: "Invalid or expired promo code" });
                }
                if (cartTotal < promo.minCartAmount) {
                    return res.status(400).json({
                        message: `Minimum cart total for this promo is ${promo.minCartAmount}`,
                    });
                }

                discount = promo.type === "fixed"
                    ? promo.value
                    : (cartTotal * promo.value) / 100;
            }

 

        }catch(exception){
            console.log(exception)
            next(exception)
        }

    }
}

module.exports = new OrderController