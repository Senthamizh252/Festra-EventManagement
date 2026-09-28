import express from 'express';
import { verifyAndCheckIn, getCheckInStats } from '../controllers/checkInController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protected organizer/admin endpoints for scanning and metrics
router.post('/scan', verifyToken, requireRole('organizer', 'admin'), verifyAndCheckIn);
router.get('/stats/:eventId', verifyToken, requireRole('organizer', 'admin'), getCheckInStats);

export default router;
