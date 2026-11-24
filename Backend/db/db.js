import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env'), quiet: true });

async function connectDB() {
    const uri = process.env.DB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/trackport';
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (err) {
        console.error('❌ Failed to connect to Database:', err.message);
        throw err;
    }
}

export default connectDB;