import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
    try {
        const { fullName, email, password, role, collegeName, department, registerNumber } = req.body;

        // 1. Validate required fields
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (fullName, email, password, role)'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // 2. Check for existing user by email or register number
        let userCheckQuery = 'SELECT id FROM users WHERE email = ?';
        let queryParams = [email];
        
        if (registerNumber) {
            userCheckQuery += ' OR register_number = ?';
            queryParams.push(registerNumber);
        }

        const [existingUsers] = await query(userCheckQuery, queryParams);
        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email or Register Number already exists in the system'
            });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Insert new user into the database
        const insertQuery = `
            INSERT INTO users (full_name, email, password, role, college_name, department, register_number)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const insertParams = [
            fullName, 
            email, 
            hashedPassword, 
            role, 
            collegeName || null, 
            department || null, 
            registerNumber || null
        ];

        const [result] = await query(insertQuery, insertParams);
        const userId = result.insertId;

        // 5. Generate signed JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured in environment variables');
        }

        const token = jwt.sign(
            { id: userId, email, role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 6. Return response with sanitized user data
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: userId,
                fullName,
                email,
                role,
                collegeName,
                department,
                registerNumber
            }
        });
    } catch (err) {
        console.error('[Register Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // 2. Find user by email
        const [users] = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const user = users[0];

        // 3. Compare password hashes
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // 4. Generate JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured in environment variables');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 5. Return token and user object
        res.json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (err) {
        console.error('[Login Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error during login',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * @desc    Get current authenticated user's profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Fetch user from DB excluding the password
        const [users] = await query(
            'SELECT id, full_name, email, role, college_name, department, register_number, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User profile not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });
    } catch (err) {
        console.error('[GetMe Error]', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error while fetching profile',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};
