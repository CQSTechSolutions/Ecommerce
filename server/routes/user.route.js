import { Router } from "express";
import { register, login, getCurrentUser } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getCurrentUser);

export default router;