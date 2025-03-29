import express from "express";
import { PrismaClient } from 'prisma-shared';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import subscriptionRoutes from './routes/subscription.routes';

dotenv.config();
const prisma = new PrismaClient();
const app = express()

// Middleware
app.use(cors());
app.use(express.json());

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

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);   

app.listen(3004, () => {
    console.log("server is running on port 3004");
})
