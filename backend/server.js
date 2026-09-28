import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';

// Load Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure cors with support for local development origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Initialize an Express application with parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security and utility middleware: console request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });
  next();
});

// Base health check route
app.get('/api/health', async (req, res) => {
  const dbStatus = await testDbConnection();
  res.json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dbConnected: dbStatus
  });
});

// Route placeholders ready for mount
app.use('/api/auth', (req, res) => res.json({ message: 'Auth route placeholder' }));
app.use('/api/events', (req, res) => res.json({ message: 'Events route placeholder' }));
app.use('/api/registrations', (req, res) => res.json({ message: 'Registrations route placeholder' }));
app.use('/api/certificates', (req, res) => res.json({ message: 'Certificates route placeholder' }));

// Global 404 handler for unrecognized routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error('[Error Handler]', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Listen on PORT and call testDbConnection() on startup
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Checking database connection...`);
  await testDbConnection();
});
