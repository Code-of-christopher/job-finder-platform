import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:userId', protect, getProfile);
router.put('/:userId', protect, updateProfile);

export default router;
