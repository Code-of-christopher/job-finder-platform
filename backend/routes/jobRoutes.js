import { Router } from 'express';
import { getJobs, getEmployerJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/get', getJobs);
router.get('/get/:id', getEmployerJobs);
router.post('/create', protect, createJob);
router.put('/update/:id', protect, updateJob);
router.delete('/delete/:id', protect, deleteJob);

export default router;
