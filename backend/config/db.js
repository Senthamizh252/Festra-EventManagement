import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool instead of a single connection for better performance
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

// Test the database connection upon initialization
const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL database connected successfully');
        connection.release(); // release the connection back to the pool
    } catch (error) {
        console.error('MySQL Connection Error:', error.message);
        // Do not exit process immediately if dev, but it's good practice to know if DB fails
        // process.exit(1); 
    }
};

connectDB();

export default pool;
