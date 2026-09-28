import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool using standard environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'festra_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Robust query helper function with execution time logging and error handling
export const query = async (text, params) => {
    const start = Date.now();
    try {
        const [rows, fields] = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`[DB Query] executed query`, { text, duration: `${duration}ms` });
        return [rows, fields];
    } catch (err) {
        const duration = Date.now() - start;
        console.error(`[DB Query Error]`, { text, duration: `${duration}ms`, error: err.message });
        throw err;
    }
};

// Asynchronous health-check ping function
export const testDbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT NOW() as now');
        console.log('✅ Database connection successful:', rows[0].now);
        connection.release();
        return true;
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        return false;
    }
};

export default pool;
