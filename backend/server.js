import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Load Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and Request body parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome status check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Festra Event Management Platform API Server.',
        status: 'online',
        phase: 1
    });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Startup Listener
app.listen(PORT, () => {
    console.log(`[Festra Backend] Server running on port ${PORT}`);
});
