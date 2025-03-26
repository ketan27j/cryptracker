"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helius_sdk_1 = require("helius-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_shared_1 = require("prisma-shared");
dotenv_1.default.config();
const prisma = new prisma_shared_1.PrismaClient();
const router = express_1.default.Router();
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error in webhook",
            error: error
        });
    }
});
router.get('/register-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
        const webhookUrl = process.env.WEBHOOK_URL || '';
        const helius = new helius_sdk_1.Helius(HELIUS_API_KEY);
        // Register webhook with Helius
        const webhookResponse = await helius.createWebhook({
            webhookURL: webhookUrl,
            transactionTypes: [helius_sdk_1.TransactionType.TRANSFER],
            accountAddresses: [helius_sdk_1.Address.W_SOL_TOKEN],
        });
        if (webhookResponse && webhookResponse.webhookID) {
            res.status(200).json({
                success: true,
                webhookId: webhookResponse.webhookID
            });
        }
        else {
            res.status(500).json({ error: 'Failed to create webhook' });
        }
    }
    catch (error) {
        console.error('Error registering webhook:', error);
        res.status(500).json({ error: 'Failed to register webhook' });
    }
});
router.get('/get-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
        const helius = new helius_sdk_1.Helius(HELIUS_API_KEY);
        helius.getAllWebhooks().then((webhooks) => {
            res.status(200).json({
                success: true,
                webhooks: webhooks
            });
        });
    }
    catch (error) {
        console.error('Error registering webhook:', error);
        res.status(500).json({ error: 'Failed to register webhook' });
    }
});
router.post('/delete-webhook', async (req, res) => {
    try {
        const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
        const webhookUrl = process.env.WEBHOOK_URL || '';
        const helius = new helius_sdk_1.Helius(HELIUS_API_KEY);
        let webhookId = req.body.webhookId;
        console.log('webhookId:', webhookId);
        const webhookResponse = await helius.deleteWebhook(webhookId);
        if (webhookResponse) {
            res.status(200).json({
                success: true,
            });
        }
        else {
            res.status(500).json({ error: 'Failed to delete webhook' });
        }
    }
    catch (error) {
        console.error('Error deleting webhook:', error);
        res.status(500).json({ error: 'Failed to delete webhook' });
    }
});
exports.default = router;
