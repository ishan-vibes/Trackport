import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from '../routes/auth.routes.js';
import projectRouter from '../routes/project.routes.js';
import taskRouter from '../routes/task.routes.js';
import userRouter from '../routes/user.routes.js';
import dashRouter from '../routes/dash.routes.js';
import analyticsRouter from '../routes/analytics.routes.js';
import integrationRouter from '../routes/integration.routes.js';

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date()
    });
});

// Guard data routes against unready database so client requests fail fast instead of hanging
app.use('/api', (req, res, next) => {
    if (req.path === '/health') return next();
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: 'Database is not connected. Please ensure MongoDB is running and DB_URI in Backend/.env is configured.'
        });
    }
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/users', userRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/integrations', integrationRouter);


// 404 Not Found handler for unknown routes
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

export default app;