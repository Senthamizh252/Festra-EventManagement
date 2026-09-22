export const participantAccess = (req, res, next) => {
    if (req.user && req.user.role === 'participant') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Participant role required.' });
    }
};

export const organizerAccess = (req, res, next) => {
    if (req.user && req.user.role === 'organizer') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Organizer role required.' });
    }
};
