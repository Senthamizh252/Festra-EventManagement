import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// Helper function for email validation
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { full_name, email, phone, register_number, department, password, role } = req.body;

        // 1. Validate required fields
        if (!full_name || !email || !phone || !register_number || !department || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // 2. Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // 3. Validate password (e.g., minimum 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        // 4. Check whether email already exists
        const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // 5. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Define user role (default to participant if not provided or invalid)
        const userRole = (role === 'organizer') ? 'organizer' : 'participant';

        // 6. Insert user into MySQL
        const query = `
            INSERT INTO users (full_name, email, phone, register_number, department, password, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [full_name, email, phone, register_number, department, hashedPassword, userRole]);

        // 8. Return response
        res.status(201).json({
            success: true,
            message: 'Registration successful'
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // 2. Find user by email
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = users[0];

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 5. Generate JWT token
        const payload = {
            id: user.id,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 6. Return user information and token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        // req.user will be populated by authMiddleware
        const userId = req.user.id;

        const [users] = await db.execute(
            'SELECT id, full_name, email, phone, register_number, department, role, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error getting profile' });
    }
};
