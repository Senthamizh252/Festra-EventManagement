import express from 'express';
import { issueCertificates, verifyCertificate } from '../controllers/certificateController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protected organizer/admin endpoint for bulk certificate generation
router.post('/issue', verifyToken, requireRole('organizer', 'admin'), issueCertificates);

// Publicly open verification endpoint (no auth required)
router.get('/verify/:certificateId', verifyCertificate);

export default router;
