import express from 'express';
import {
    getEventAttendees,
    getMyRegistrations,
    registerForEvent
} from '../controllers/registrationController.js';
import { requireRole, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, requireRole('participant'), registerForEvent);
router.get('/me', verifyToken, requireRole('participant'), getMyRegistrations);
router.get('/events/:eventId/attendees', verifyToken, requireRole('organizer', 'admin'), getEventAttendees);

export default router;