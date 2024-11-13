const express = require('express');
const Product = require('../models/Product');

const router = express.Router();



// Get all products
// router.get('/', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new product
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({ name, description, price });
  await newProduct.save();
  res.json(newProduct);
});

// router.post('/products', async (req, res) => {
//   const newProduct = new Product(req.body);
//   try {
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Delete product
router.delete('/:id',  async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.send('Product deleted');
});

module.exports = router;
