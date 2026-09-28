import pool, { query } from '../config/db.js';

const eventStatuses = ['draft', 'published', 'ongoing', 'completed'];
const publicEventStatuses = ['published', 'ongoing', 'completed'];

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

export const getAllEvents = async (req, res) => {
    try {
        const { category, search, status } = req.query;
        if (status && !eventStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid event status' });
        }

        const conditions = ['e.archived_at IS NULL', 'e.status IN (?, ?, ?)'];
        const params = [...publicEventStatuses];

        if (category) {
            conditions.push('LOWER(e.category) = LOWER(?)');
            params.push(category.trim());
        }
        if (search) {
            conditions.push('(e.title LIKE ? OR e.description LIKE ? OR e.venue LIKE ?)');
            const term = `%${search.trim()}%`;
            params.push(term, term, term);
        }
        if (status) {
            conditions.push('e.status = ?');
            params.push(status);
        }

        const [events] = await query(
            `SELECT e.*, COUNT(r.id) AS current_registrations
             FROM events e
             LEFT JOIN registrations r
               ON r.event_id = e.id AND r.status IN ('pending', 'approved')
             WHERE ${conditions.join(' AND ')}
             GROUP BY e.id
             ORDER BY e.event_date ASC, e.start_time ASC`,
            params
        );

        return res.json({ success: true, events });
    } catch (err) {
        return sendError(res, err, 'GetAllEvents Error');
    }
};

export const getEventById = async (req, res) => {
    try {
        const [events] = await query(
            `SELECT e.*, COUNT(r.id) AS current_registrations,
                    CASE WHEN e.capacity IS NULL THEN NULL
                         ELSE GREATEST(e.capacity - COUNT(r.id), 0) END AS remaining_capacity
             FROM events e
             LEFT JOIN registrations r
               ON r.event_id = e.id AND r.status IN ('pending', 'approved')
             WHERE e.id = ? AND e.archived_at IS NULL
               AND e.status IN (?, ?, ?)
             GROUP BY e.id`,
            [req.params.id, ...publicEventStatuses]
        );

        if (!events.length) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        const event = events[0];
        const [speakers] = await query(
            'SELECT id, name, title, bio, photo_url FROM event_speakers WHERE event_id = ? ORDER BY sort_order, id',
            [event.id]
        );
        const [agenda] = await query(
            'SELECT id, title, description, start_time, end_time FROM event_agenda WHERE event_id = ? ORDER BY sort_order, start_time, id',
            [event.id]
        );

        return res.json({
            success: true,
            event: { ...event, speakers, agenda, remainingCapacity: event.remaining_capacity }
        });
    } catch (err) {
        return sendError(res, err, 'GetEventById Error');
    }
};

export const createEvent = async (req, res) => {
    try {
        const {
            title, description, category, venue, eventDate, startTime, endTime,
            capacity, registrationFee, bannerUrl
        } = req.body;

        if (!title?.trim() || !eventDate || !Number.isInteger(Number(capacity)) || Number(capacity) < 1) {
            return res.status(400).json({
                success: false,
                message: 'title, eventDate, and a positive integer capacity are required'
            });
        }
        if (registrationFee !== undefined && (!Number.isFinite(Number(registrationFee)) || Number(registrationFee) < 0)) {
            return res.status(400).json({ success: false, message: 'registrationFee must be a non-negative number' });
        }

        const [result] = await query(
            `INSERT INTO events
             (title, description, category, venue, event_date, start_time, end_time,
              capacity, registration_fee, banner_url, organizer_id, created_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title.trim(), description ?? null, category ?? null, venue ?? null,
                eventDate, startTime ?? null, endTime ?? null, Number(capacity),
                registrationFee === undefined ? 0 : Number(registrationFee), bannerUrl ?? null,
                req.user.id, req.user.id
            ]
        );
        const [events] = await query('SELECT * FROM events WHERE id = ?', [result.insertId]);

        return res.status(201).json({ success: true, message: 'Event created successfully', event: events[0] });
    } catch (err) {
        return sendError(res, err, 'CreateEvent Error');
    }
};

export const updateEvent = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const [events] = await connection.query(
            'SELECT * FROM events WHERE id = ? AND archived_at IS NULL FOR UPDATE',
            [req.params.id]
        );
        if (!events.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        if (!canManageEvent(events[0], req.user)) {
            await connection.rollback();
            return res.status(403).json({ success: false, message: 'You cannot manage this event' });
        }

        const fields = {
            title: 'title', description: 'description', category: 'category', venue: 'venue',
            eventDate: 'event_date', startTime: 'start_time', endTime: 'end_time',
            capacity: 'capacity', registrationFee: 'registration_fee', bannerUrl: 'banner_url', status: 'status'
        };
        const updates = Object.entries(fields)
            .filter(([key]) => Object.hasOwn(req.body, key))
            .map(([key, column]) => [column, req.body[key]]);

        if (!updates.length) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'No event fields provided to update' });
        }
        if (Object.hasOwn(req.body, 'status') && !eventStatuses.includes(req.body.status)) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'Invalid event status' });
        }
        if (Object.hasOwn(req.body, 'capacity') && req.body.capacity !== null) {
            const capacity = Number(req.body.capacity);
            if (!Number.isInteger(capacity) || capacity < 1) {
                await connection.rollback();
                return res.status(400).json({ success: false, message: 'capacity must be a positive integer or null' });
            }
            const [counts] = await connection.query(
                "SELECT COUNT(*) AS total FROM registrations WHERE event_id = ? AND status IN ('pending', 'approved')",
                [req.params.id]
            );
            if (capacity < Number(counts[0].total)) {
                await connection.rollback();
                return res.status(409).json({ success: false, message: 'capacity cannot be lower than current registrations' });
            }
        }
        if (Object.hasOwn(req.body, 'registrationFee') &&
            (!Number.isFinite(Number(req.body.registrationFee)) || Number(req.body.registrationFee) < 0)) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'registrationFee must be a non-negative number' });
        }

        await connection.query(
            `UPDATE events SET ${updates.map(([column]) => `${column} = ?`).join(', ')} WHERE id = ?`,
            [...updates.map(([, value]) => value), req.params.id]
        );
        const [updatedEvents] = await connection.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
        await connection.commit();
        return res.json({ success: true, message: 'Event updated successfully', event: updatedEvents[0] });
    } catch (err) {
        if (connection) await connection.rollback().catch(() => {});
        return sendError(res, err, 'UpdateEvent Error');
    } finally {
        connection?.release();
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const [events] = await query('SELECT * FROM events WHERE id = ? AND archived_at IS NULL', [req.params.id]);
        if (!events.length) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        if (!canManageEvent(events[0], req.user)) {
            return res.status(403).json({ success: false, message: 'You cannot manage this event' });
        }

        await query('UPDATE events SET archived_at = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);
        return res.json({ success: true, message: 'Event archived successfully' });
    } catch (err) {
        return sendError(res, err, 'DeleteEvent Error');
    }
};