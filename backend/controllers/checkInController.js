import { query } from '../config/db.js';

/**
 * @desc    Verify QR token and log check-in
 * @route   POST /api/checkins/scan
 * @access  Private (Organizer/Admin)
 */
export const verifyAndCheckIn = async (req, res) => {
    try {
        const { qrToken, eventId, gateLocation } = req.body;
        const scannedBy = req.user.id;

        if (!qrToken || !eventId) {
            return res.status(400).json({
                success: false,
                message: 'QR token and Event ID are required'
            });
        }

        // 1. Validate registration
        const [registrations] = await query(
            `SELECT r.id, r.checked_in, r.checked_in_at, u.full_name, u.department, r.pass_tier 
             FROM registrations r
             JOIN users u ON r.user_id = u.id
             WHERE r.qr_token = ? AND r.event_id = ?`,
            [qrToken, eventId]
        );

        if (registrations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Invalid pass or not registered for this event'
            });
        }

        const registration = registrations[0];

        // 2. Check if already checked in
        if (registration.checked_in) {
            return res.status(409).json({
                success: false,
                message: 'Pass already scanned',
                checkedInAt: registration.checked_in_at
            });
        }

        // 3. Update check-in status
        await query(
            `UPDATE registrations 
             SET checked_in = true, checked_in_at = NOW(), scanned_by = ?, gate_location = ?
             WHERE id = ?`,
            [scannedBy, gateLocation || 'Main Gate', registration.id]
        );

        // 4. Return success with attendee profile for frontend UI
        res.json({
            success: true,
            message: 'Check-in successful',
            attendee: {
                name: registration.full_name,
                department: registration.department,
                passTier: registration.pass_tier
            }
        });
    } catch (err) {
        console.error('[Check-in Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during check-in verification',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * @desc    Get check-in statistics for an event
 * @route   GET /api/checkins/stats/:eventId
 * @access  Private (Organizer/Admin)
 */
export const getCheckInStats = async (req, res) => {
    try {
        const { eventId } = req.params;

        const [stats] = await query(
            `SELECT 
                COUNT(*) as total_registered,
                SUM(CASE WHEN checked_in = true THEN 1 ELSE 0 END) as total_checked_in
             FROM registrations
             WHERE event_id = ?`,
            [eventId]
        );

        if (stats.length === 0 || stats[0].total_registered === 0) {
            return res.json({
                success: true,
                stats: { totalRegistered: 0, totalCheckedIn: 0, remaining: 0 }
            });
        }

        const totalRegistered = parseInt(stats[0].total_registered) || 0;
        const totalCheckedIn = parseInt(stats[0].total_checked_in) || 0;
        const remaining = totalRegistered - totalCheckedIn;

        res.json({
            success: true,
            stats: {
                totalRegistered,
                totalCheckedIn,
                remaining
            }
        });
    } catch (err) {
        console.error('[Check-in Stats Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error fetching check-in stats',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};
