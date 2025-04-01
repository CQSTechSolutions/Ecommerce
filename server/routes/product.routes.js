import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    bulkCreateProducts,
    getProductsByCategory
} from '../controllers/product.controller.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

// Bulk create products
router.post('/bulk', bulkCreateProducts);

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router; 