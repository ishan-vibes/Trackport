import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './src/app.js';
import connectDB from './db/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
    // Start Express server first so API & health checks respond immediately
    app.listen(PORT, () => {
        console.log(`🚀 TrackPort Server is running on port ${PORT}`);
    });

    // Connect to MongoDB
    try {
        await connectDB();
    } catch (err) {
        console.warn('\n⚠️  MongoDB connection warning:');
        console.warn(`   Error Details: ${err.message}`);
        console.warn('   Could not connect to MongoDB at:', process.env.DB_URI ? '[Atlas URI in .env]' : 'mongodb://localhost:27017/trackport');
        
        if (err.message && (err.message.includes('bad auth') || err.message.includes('Authentication failed'))) {
            console.warn('   👉 Fix: Incorrect username or password in Backend/.env (Verify in MongoDB Atlas > Database Access).');
        } else if (err.message && (err.message.includes('Server selection timed out') || err.message.includes('ETIMEDOUT') || err.message.includes('ENOTFOUND') || err.message.includes('querySrv'))) {
            console.warn('   👉 Fix 1: Whitelist your IP in MongoDB Atlas (Network Access -> Add IP Address -> Allow Access from Anywhere 0.0.0.0/0).');
            console.warn('   👉 Fix 2: Check internet connection or DNS. If SRV lookup fails, set DNS to 8.8.8.8.');
        } else if (err.message && err.message.includes('ECONNREFUSED')) {
            console.warn('   👉 Fix: Local MongoDB is not running. Start mongod or install MongoDB Community Server.');
        } else {
            console.warn('   -> If running locally: make sure MongoDB is started (mongod).');
            console.warn('   -> If using MongoDB Atlas: check IP whitelist & connection string in Backend/.env.\n');
        }
        console.warn('');
    }
}

startServer();