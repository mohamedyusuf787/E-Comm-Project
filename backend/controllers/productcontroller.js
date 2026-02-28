const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, rating } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      description,
      price:Number(price),
      category,
      rating:Number(rating),
      images: [imagePath],
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct };