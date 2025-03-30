import express from "express";
import { PrismaClient } from 'prisma-shared';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'clientApp')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'clientApp', 'index.html'));
});

app.get("/status", async (req, res) => {
    try {
        res.status(200).json({
            message: "Ok"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});

// Import routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(3004, () => {
    console.log("server is running on port 3004");
})
