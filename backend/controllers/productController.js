const Product = require('../models/productModel');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    const photo = req.file ? req.file.filename : req.body.photo; // Use filename if file is uploaded, otherwise use photo URL 
    const newProduct = new Product({ name, price, quantity, description, photo });
    const savedProduct = await newProduct.save(); res.status(201).json(savedProduct); 
  } 
  catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    let updatedFields = { name, price, quantity };
    if (req.file) {
      updatedFields.photo = `uploads/${req.file.filename}`;
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
