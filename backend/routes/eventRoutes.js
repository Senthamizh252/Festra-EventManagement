import express from 'express';
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    updateEvent
} from '../controllers/eventController.js';
import { requireRole, verifyToken } from '../middleware/auth.js';

const router = express.Router();
const organizerOnly = [verifyToken, requireRole('organizer', 'admin')];

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', ...organizerOnly, createEvent);
router.put('/:id', ...organizerOnly, updateEvent);
router.delete('/:id', ...organizerOnly, deleteEvent);

export default router;