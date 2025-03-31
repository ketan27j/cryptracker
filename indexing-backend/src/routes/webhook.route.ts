import express from 'express';
import dotenv from 'dotenv';
import {PrismaClient,  UserPostgresDatabase} from 'prisma-shared';
import { Pool } from 'pg';

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();

router.post("/helius-webhook", async (req, res) => {
    try {
        const response = JSON.stringify(req.body, null, 2);
        console.log('webhook response:', response);
        if (!response) {
          return res.status(400).json({ error: 'Invalid webhook payload' });
        }
        const userDb = await prisma.userPostgresDatabase.findFirst({
            where: {
              userId: 1,
            },
          });
        if (userDb) {
          const pool = new Pool({
            host: userDb.host,
            port: userDb.port,
            database: userDb.databaseName,
            user: userDb.userName,
            password: userDb.password,
          });
          const client = await pool.connect();
          const query = `INSERT INTO HeliusResponse (response) VALUES ('${response}')`;
          
          res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error in webhook",
            error: error
        });
    }
});

export default router;