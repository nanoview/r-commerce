const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); // Correctly import middleware
const upload = require('../middleware/fileUploadMiddleware'); // Import the file upload middleware
const router = express.Router();

router.get('/products', getProducts); // Public route for fetching products
router.post('/products', authenticateToken, upload.single('photo'), createProduct); // Add multer middleware for file upload
router.put('/products/:id', authenticateToken, upload.single('photo'), updateProduct); // Add multer middleware for file upload
router.delete('/products/:id', authenticateToken, deleteProduct);

module.exports = router;