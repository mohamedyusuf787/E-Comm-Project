const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true  //Removes extra spaces.
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    images: [
      {
        type: String,
        required: true
      }
    ],

    rating: {
      type: Number,
      default: 0
    },

    isFeatured: {
      type: Boolean,
      default: false
    }
    
  },
  { timestamps: true }
  //   Example

  // {
  //   "name": "Headphones",
  //   "createdAt": "2025-02-20T10:30:00Z",
  //   "updatedAt": "2025-02-20T10:30:00Z"
  // }
);

module.exports = mongoose.model("Product", productSchema);