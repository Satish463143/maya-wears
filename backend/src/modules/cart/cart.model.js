const mongoose = require ('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    items: [
        {

          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }, // Reference to the Product model
          title: {type: String, required: true},
          size: { type: String, required: true }, // Selected size (e.g., M, L)
          quantity: { type: Number, required: true }, // Quantity for the selected size
          productImage: { type: String, required: true }, // Image URL of the product
          price:{type: Number, required: true},
          amount: { type: Number, required: true },
        }
      ],
    }, 
    {
        timestamps:true,
        autoIndex:true,
        autoCreate:true
})

const CartModel = new mongoose.model('cart',cartSchema)
module.exports = CartModel