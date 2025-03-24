import axios from 'axios';
import express from 'express';
import { Address,TransactionType,Helius } from 'helius-sdk';
import dotenv from 'dotenv';
import prisma from '@repo/db';

dotenv.config();
const router = express.Router();

router.post("/helius-webhook", async (req, res) => {
    try {
        const response = JSON.stringify(req.body, null, 2);
    
        if (!response) {
          return res.status(400).json({ error: 'Invalid webhook payload' });
        }
        const transactionRes = await prisma.transaction.create({
            data: {
              walletId: 14,
              amount: 1,
              signature: response,
              tweeted: false,
              timestamp: new Date(),
            },
          });
        
        res.status(200).json({ success: true });
        
        // Get latest price data after acknowledging the webhook
        // const tokenSymbol = 'SOL';
        // const priceData = await getTokenPrices(tokenSymbol);
        // console.log('Latest price data:', priceData);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error in webhook",
            error: error
        });
    }
});

router.get('/register-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY: string = process.env.HELIUS_API_KEY || '';
        const webhookUrl: string = process.env.WEBHOOK_URL || '';
        const helius = new Helius(HELIUS_API_KEY)
        // Register webhook with Helius
        const webhookResponse = await helius.createWebhook({
            webhookURL: webhookUrl,
            transactionTypes: [TransactionType.TRANSFER],
            accountAddresses: [Address.W_SOL_TOKEN], 
        });

        if (webhookResponse && webhookResponse.webhookID) {
            res.status(200).json({
                success: true,
                webhookId: webhookResponse.webhookID
            });
        } else {
            res.status(500).json({ error: 'Failed to create webhook' });
        }
    } catch (error) {
        console.error('Error registering webhook:', error);
        res.status(500).json({ error: 'Failed to register webhook' });
    }
});

router.get('/get-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY: string = process.env.HELIUS_API_KEY || '';
        const helius = new Helius(HELIUS_API_KEY)
        helius.getAllWebhooks().then((webhooks) => {
            res.status(200).json({
                success: true,
                webhooks: webhooks
            });
        });
    } catch (error) {
        console.error('Error registering webhook:', error);
        res.status(500).json({ error: 'Failed to register webhook' });
    }
});
export default router;