const express = require('express');
const Product = require('../models/testModel'); // MongoDB model
const router = express.Router();

// POST route to save product
router.post('/api/test', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json({ message: 'Product created', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
