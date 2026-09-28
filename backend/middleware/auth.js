import jwt from 'jsonwebtoken';

/**
 * Middleware to extract and verify JWT token from Authorization header.
 * Attaches decoded payload (id, email, role) to req.user.
 */
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied: No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured in environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; // { id, email, role }
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Access denied: Invalid or expired token',
            error: err.message
        });
    }
};

/**
 * Middleware for Role-based access control.
 * @param {...string} roles - Array of allowed roles (e.g., 'organizer', 'admin')
 */
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access forbidden: Insufficient permissions'
            });
        }
        next();
    };
};
