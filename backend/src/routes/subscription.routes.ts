import express from 'express';
import { Address, Helius, TransactionType, WebhookType } from 'helius-sdk';
import { prisma } from 'prisma-shared';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const HELIUS_API_KEY: string = process.env.HELIUS_API_KEY || '';
const webhookUrl: string = process.env.WEBHOOK_URL || '';
const helius = new Helius(HELIUS_API_KEY)

router.post("/new-subscription", async (req, res) => {
    try {
        const { address, subscriptionType, type } = req.body;
        console.log('address:', address);
        console.log('subscriptionType:', subscriptionType);
        const response = await prisma.subscription.create({
            data: {
                userId : 1,
                webhookUrl: webhookUrl,
                targetTokens: address,
                subscriptionType: subscriptionType,
            },
          });
          if(response) {
            res.status(200).json({
                success: true,
            });
        }
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
});

router.get('/register-webhook', async (req, res) => {
    try {

        // Register webhook with Helius
        const webhookResponse = await helius.createWebhook({
            webhookURL: webhookUrl,
            webhookType: WebhookType.ENHANCED_DEVNET,
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

router.post('/delete-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY: string = process.env.HELIUS_API_KEY || '';
        const webhookUrl: string = process.env.WEBHOOK_URL || '';
        const helius = new Helius(HELIUS_API_KEY)
        let webhookId = req.body.webhookId;
        console.log('webhookId:', webhookId);
        const webhookResponse = await helius.deleteWebhook(webhookId);

        if (webhookResponse) {
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(500).json({ error: 'Failed to delete webhook' });
        }
    } catch (error) {
        console.error('Error deleting webhook:', error);
        res.status(500).json({ error: 'Failed to delete webhook' });
    }
});

export default router;