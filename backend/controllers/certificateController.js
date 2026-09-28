import { query } from '../config/db.js';
import crypto from 'crypto';

/**
 * @desc    Issue certificates in bulk for verified attendees
 * @route   POST /api/certificates/issue
 * @access  Private (Organizer/Admin)
 */
export const issueCertificates = async (req, res) => {
    try {
        const { eventId, recipientCriteria } = req.body;

        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: 'Event ID is required'
            });
        }

        // Determine target audience based on criteria (e.g., 'checked_in')
        let fetchAttendeesQuery = `
            SELECT r.user_id, u.full_name, e.title as event_title 
            FROM registrations r
            JOIN users u ON r.user_id = u.id
            JOIN events e ON r.event_id = e.id
            WHERE r.event_id = ? 
        `;

        if (recipientCriteria === 'checked_in') {
            fetchAttendeesQuery += ` AND r.checked_in = true`;
        }

        const [attendees] = await query(fetchAttendeesQuery, [eventId]);

        if (attendees.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No attendees found matching the criteria'
            });
        }

        let issuedCount = 0;

        for (const attendee of attendees) {
            // Generate unique immutable Certificate ID
            const randomHash = crypto.randomBytes(4).toString('hex').toUpperCase();
            const certificateId = `FESTRA-CERT-${randomHash}`;

            // Create verification hash payload
            const verificationHash = crypto.createHash('sha256')
                .update(`${attendee.user_id}-${eventId}-${Date.now()}`)
                .digest('hex');

            const insertCertQuery = `
                INSERT INTO certificates 
                (certificate_id, user_id, event_id, recipient_name, event_title, certificate_type, verification_hash, issued_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
            `;
            
            try {
                await query(insertCertQuery, [
                    certificateId,
                    attendee.user_id,
                    eventId,
                    attendee.full_name,
                    attendee.event_title,
                    'Participation', // Default to Participation, could be dynamically set
                    verificationHash
                ]);
                issuedCount++;
            } catch (insertErr) {
                // Ignore unique constraint violations if running multiple times
                if (insertErr.code !== 'ER_DUP_ENTRY') {
                    console.error('Error inserting cert for user:', attendee.user_id, insertErr);
                }
            }
        }

        res.json({
            success: true,
            message: `Successfully issued ${issuedCount} certificates.`,
            issuedCount
        });
    } catch (err) {
        console.error('[Issue Certs Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error while issuing certificates',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * @desc    Public verification of a certificate
 * @route   GET /api/certificates/verify/:certificateId
 * @access  Public
 */
export const verifyCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;

        const [certificates] = await query(
            `SELECT certificate_id, recipient_name, event_title, certificate_type, issued_at 
             FROM certificates 
             WHERE certificate_id = ?`,
            [certificateId]
        );

        if (certificates.length === 0) {
            return res.status(404).json({
                isValid: false,
                message: 'Certificate ID not found or unverified'
            });
        }

        const cert = certificates[0];

        res.json({
            isValid: true,
            recipientName: cert.recipient_name,
            eventTitle: cert.event_title,
            certificateType: cert.certificate_type,
            issuedAt: cert.issued_at
        });
    } catch (err) {
        console.error('[Verify Cert Error]', err);
        res.status(500).json({
            isValid: false,
            message: 'Internal server error during certificate verification',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};
