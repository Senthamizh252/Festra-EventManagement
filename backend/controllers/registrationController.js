import { randomUUID } from 'node:crypto';
import pool, { query } from '../config/db.js';

const canManageEvent = (event, user) =>
    user.role === 'admin' || Number(event.created_by ?? event.organizer_id) === Number(user.id);

const sendError = (res, err, label) => {
    console.error(`[${label}]`, err);
    return res.status(500).json({
        success: false,
        message: 'An internal server error occurred',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

export const registerForEvent = async (req, res) => {
    const eventId = req.body.eventId;
    const { teamName, teamMembers } = req.body;
    if (!eventId || (teamMembers !== undefined && !Array.isArray(teamMembers))) {
        return res.status(400).json({ success: false, message: 'A valid eventId and teamMembers array are required' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [events] = await connection.query(
            `SELECT id, status, event_date, capacity,
                    (event_date >= CURDATE()) AS registration_date_open
             FROM events WHERE id = ? AND archived_at IS NULL FOR UPDATE`,
            [eventId]
        );
        if (!events.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        const event = events[0];
        if (event.status !== 'published' || !event.registration_date_open) {
            await connection.rollback();
            return res.status(409).json({ success: false, message: 'Registration for this event is closed' });
        }

        const [existing] = await connection.query(
            'SELECT id FROM registrations WHERE event_id = ? AND user_id = ? LIMIT 1',
            [eventId, req.user.id]
        );
        if (existing.length) {
            await connection.rollback();
            return res.status(409).json({ success: false, message: 'You are already registered for this event' });
        }

        const [counts] = await connection.query(
            "SELECT COUNT(*) AS total FROM registrations WHERE event_id = ? AND status IN ('pending', 'approved')",
            [eventId]
        );
        if (event.capacity !== null && Number(counts[0].total) >= Number(event.capacity)) {
            await connection.rollback();
            return res.status(409).json({ success: false, message: 'This event has reached capacity' });
        }

        const ticketToken = `FESTRA-${randomUUID()}`;
        const [result] = await connection.query(
            `INSERT INTO registrations (event_id, user_id, status, ticket_token, team_name, team_members)
             VALUES (?, ?, 'approved', ?, ?, ?)`,
            [eventId, req.user.id, ticketToken, teamName ?? null, teamMembers ? JSON.stringify(teamMembers) : null]
        );
        await connection.commit();

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            registration: {
                id: result.insertId,
                eventId: Number(eventId),
                userId: req.user.id,
                status: 'approved',
                passStatus: 'active',
                ticketToken
            }
        });
    } catch (err) {
        if (connection) await connection.rollback().catch(() => {});
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'You are already registered for this event' });
        }
        return sendError(res, err, 'RegisterForEvent Error');
    } finally {
        connection?.release();
    }
};

export const getMyRegistrations = async (req, res) => {
    try {
        const [registrations] = await query(
            `SELECT r.id AS registration_id, r.event_id, r.status AS registration_status,
                    r.payment_status, r.ticket_token, r.registration_date, r.team_name,
                    e.title, e.description, e.category, e.venue, e.event_date,
                    e.start_time, e.end_time, e.banner_url,
                    CASE WHEN a.user_id IS NOT NULL THEN 'checked_in'
                         WHEN r.status = 'rejected' THEN 'cancelled'
                         ELSE 'active' END AS pass_status
             FROM registrations r
             JOIN events e ON e.id = r.event_id
             LEFT JOIN attendance a ON a.event_id = r.event_id AND a.user_id = r.user_id
             WHERE r.user_id = ?
             ORDER BY e.event_date DESC, r.registration_date DESC`,
            [req.user.id]
        );
        return res.json({ success: true, registrations });
    } catch (err) {
        return sendError(res, err, 'GetMyRegistrations Error');
    }
};

export const getEventAttendees = async (req, res) => {
    try {
        const [events] = await query('SELECT id, created_by, organizer_id FROM events WHERE id = ? AND archived_at IS NULL', [req.params.eventId]);
        if (!events.length) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        if (!canManageEvent(events[0], req.user)) {
            return res.status(403).json({ success: false, message: 'You cannot view attendees for this event' });
        }

        const [attendees] = await query(
            `SELECT r.id AS registration_id, r.user_id, u.full_name, u.email,
                    u.register_number, u.department, r.registration_date, r.status AS registration_status,
                    r.payment_status, r.ticket_token, r.team_name, r.team_members,
                    CASE WHEN a.user_id IS NULL THEN FALSE ELSE TRUE END AS checked_in,
                    a.check_in_time
             FROM registrations r
             JOIN users u ON u.id = r.user_id
             LEFT JOIN attendance a ON a.event_id = r.event_id AND a.user_id = r.user_id
             WHERE r.event_id = ?
             ORDER BY r.registration_date ASC`,
            [req.params.eventId]
        );
        return res.json({ success: true, eventId: Number(req.params.eventId), attendees });
    } catch (err) {
        return sendError(res, err, 'GetEventAttendees Error');
    }
};