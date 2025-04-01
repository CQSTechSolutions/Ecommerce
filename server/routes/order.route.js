import { Router } from "express";
import { auth, adminAuth } from '../middleware/auth.middleware.js';
import { 
    getUserOrders,
    getOrderById,
    createOrder,
    updateOrderPayment,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} from '../controllers/order.controller.js';

const router = Router();

// User routes (require regular authentication)
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);
router.put('/:id/pay', auth, updateOrderPayment);
router.put('/:id/cancel', auth, cancelOrder);

// Admin routes (require admin authentication)
router.get('/admin', auth, adminAuth, getAllOrders);
router.put('/:id/status', auth, adminAuth, updateOrderStatus);

export default router; 