import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// Authentication endpoints (Planned for implementation in later phases)
app.post('/api/auth/login', (req, res) => {
    res.status(501).json({
        message: 'Backend server is in Phase 1 (UI/UX Foundation). The login API integration is pending implementation.'
    });
});

app.post('/api/auth/register', (req, res) => {
    res.status(501).json({
        message: 'Backend server is in Phase 1 (UI/UX Foundation). The register API integration is pending implementation.'
    });
});

// Startup Listener
app.listen(PORT, () => {
    console.log(`[Festra Backend] Server running on port ${PORT}`);
});
