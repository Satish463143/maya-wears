const { orderStatus, paymentType } = require("../../config/constants.config");
const CartModel = require("../cart/cart.model");
const CustomerModel = require("../customerDetails/customer.model")
const PromoModel = require("../promo/promo.model");
const OrderModel = require("./Order.model");
const OrderService = require("./Order.service");

class OrderController {    
    create = async (req, res, next) => {
        try {
            const { cartId, cartTotal, promoCode,customerId,paymentType } = req.body;

            const cart = await CartModel.findById(cartId)
                .populate("userId")
                .populate("items.productId");
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            const customer = await CustomerModel.findById(customerId)
                .populate("userId")

            if (!customer) {
                return res.status(404).json({ message: "Customer  not found" });
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
            const serviceCharge = (calculatedSubtotal === 1000 ? 0 : 150); // 10% service charge
            const vat = 0; // 13% VAT
            const total = discountedSubtotal + serviceCharge + vat;

            const items = cart.items.map((item) => ({
                productId: item.productId._id, // Only the ID of the product
                title: item.title,
                size: item.size,
                quantity: item.quantity,
                productImage: item.productImage,
            }));
            //create order id 
            const lastOrder = await OrderModel.findOne().sort({ orderId: -1 });
            let newOrderId;
            if (lastOrder && lastOrder.orderId) {
                // Increment the last orderId
                newOrderId = parseInt(lastOrder.orderId) + 1;
            } else {
                // Start from 202501 if no previous orders exist
                newOrderId = 202501;
            }

            // Create a new order
            const newOrder = await OrderModel.create({   
                orderId: newOrderId,
                customerId: customer._id,
                cartId: cart._id,
                userId: cart.userId,
                items, // Save the items array
                subTotal: calculatedSubtotal,
                discount,
                serviceCharge,
                vat,
                total,
                paymentType,
                orderStatus: orderStatus.PENDING,
                createdBy: cart.userId,
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
    index= async(req,res,next)=>{
        try{
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1 
            const skip = (page-1 )*limit

            let filter = {}

            if(req.query.search){
                filter =  {orderStatus : new RegExp(req.query.search, 'i')}

            }
            const {count, data } = await OrderService.listData({
                skip:skip,
                limit:limit,
                filter:filter
            })

            res.json({
                result:data,
                message:"List of order",
                meta:{
                    currentPage:page,
                    limit:limit,
                    total:count
                }
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    indexForUser= async(req,res,next)=>{
        try{
            const limit = parseInt(req.query.limit) || 10; // Pagination limit
            const page = parseInt(req.query.page) || 1; // Current page
            const skip = (page - 1) * limit; 
            const userId = req.authUser._id

            let filter = { userId };

            if (req.query.search) {
                filter = {
                    ...filter,
                    name: new RegExp(req.query.search, 'i'),
                };
            }
            const { count, data } = await OrderService.listData({
                skip: skip,
                limit: limit,
                filter: filter,
            });
            res.json({
                result: data,
                message: "List of orders for user",
                meta: {
                    currentPage: page,
                    limit: limit,
                    total: count,
                },
            });

        }catch(exception){
            next(exception)
        }
    }
    updateForUser = async (req, res, next) => {
        try {
            const userId = req.authUser._id;
            const orderId = req.params.id;
    
            // Find the order with the specified ID, belonging to the user, and in PENDING status
            const order = await OrderModel.findOne({ _id: orderId, userId});
    
            if (!order) {
                return res.status(400).json({
                    message: "Order not found or cannot be canceled.",
                });
            } else if (order.orderStatus === orderStatus.CANCEL) {
                return res.status(400).json({
                    message: "Your order is already canceled.",
                });
            } else if (order.orderStatus !== orderStatus.PENDING) {
                return res.status(400).json({
                    message: "Order cannot be canceled. It's already shipped and will be delivered soon to you.",
                });
            }
           
    
            // Update the order status to CANCEL
            order.orderStatus = orderStatus.CANCEL;
            await order.save();
    
            res.json({
                detail: order,
                message: "Order canceled successfully",
                meta: null,
            });
        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };    
    show=async(req,res,next)=>{
        try{
            const orderId = req.params.id

            const order = await OrderModel.findOne({ _id: orderId,})
                .populate({
                    path: "customerId",
                    select: ["fullname", "email", "phone", "optionalNumber","country","province","city","address","landMark","postalCode",], // Fetch specific fields
                })
                .populate("userId", "name email")
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                    meta: null,
                });
            }
            
            res.json({
                detail:order,
                message:"Order detail by id",
                meta:null
            })


        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    update=async(req,res,next)=>{
        try{
            const orderId = req.params.id;
            const updateStatus = req.body.orderStatus;

            const order = await OrderModel.findOne({ _id: orderId});

            if (!order) {
                return res.status(404).json({
                    message: "Order not found.",
                });
            }

            order.orderStatus = updateStatus

            await order.save();
            res.json({
                detail: order,
                message: "Order Updated successfully",
                meta: null,
            });

        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
}


module.exports = new OrderController