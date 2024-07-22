import { Router } from 'express';
import { getApplications, getClients, submitApplication } from '../controllers/applicationController.js';

const router = Router();

router.post('/submit', submitApplication);
router.get('/getApplications/:id', getApplications);
router.get('/getClients/:id', getClients);

export default router;
