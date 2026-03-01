const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",  // this can create connection between Cart and Product collections
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("cart", cartSchema)