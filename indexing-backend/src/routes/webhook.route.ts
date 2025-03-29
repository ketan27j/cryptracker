import axios from 'axios';
import express from 'express';
import { Address,TransactionType,Helius, WebhookType } from 'helius-sdk';
import dotenv from 'dotenv';
import {PrismaClient} from 'prisma-shared';

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();

router.post("/helius-webhook", async (req, res) => {
    try {
        const response = JSON.stringify(req.body, null, 2);
    
        if (!response) {
          return res.status(400).json({ error: 'Invalid webhook payload' });
        }
        const transactionRes = await prisma.tokenPrice.create({
            data: {
              tokenAddress: "SOL",
              price: 1,
              response: response,
              subscriptionId: 1,
            },
          });
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error in webhook",
            error: error
        });
    }
});

export default router;