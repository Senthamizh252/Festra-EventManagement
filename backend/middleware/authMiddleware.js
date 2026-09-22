import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const protect = async (req, res, next) => {
    let token;

    // Check if token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to req.user (we don't need full user from DB for role check if payload has it, but let's keep it simple)
            req.user = decoded; // { id, role, iat, exp }

            next();
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};
