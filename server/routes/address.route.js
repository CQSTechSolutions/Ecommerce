import { Router } from "express";
import { auth, adminAuth } from '../middleware/auth.middleware.js';
import { 
    getUserAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from '../controllers/address.controller.js';

const router = Router();

// All address routes require authentication
router.use(auth);

// User routes
router.get('/', getUserAddresses);
router.get('/:id', getAddressById);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);
router.put('/:id/default', setDefaultAddress);

export default router; 