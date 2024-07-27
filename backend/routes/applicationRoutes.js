import { Router } from 'express';
import { getApplications, getClientsForEmployer, submitApplication } from '../controllers/applicationController.js';

const router = Router();

router.post('/submit', submitApplication);
router.get('/getApplications/:id', getApplications);
router.get('/getClientsForEmployer/:employerId', getClientsForEmployer);

export default router;
