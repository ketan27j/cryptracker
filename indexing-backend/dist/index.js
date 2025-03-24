"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const twitter_api_v2_1 = __importDefault(require("twitter-api-v2"));
const prisma_shared_1 = require("prisma-shared");
const solana_1 = require("./utils/solana");
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const prisma = new prisma_shared_1.PrismaClient();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/monitor", async (req, res) => {
    try {
        const twitterClient = new twitter_api_v2_1.default({
            appKey: process.env.TWITTER_API_KEY || '',
            appSecret: process.env.TWITTER_API_SECRET || '',
            accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
            accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
        });
        const rwClient = twitterClient.readWrite;
        const response = await axios_1.default.get(process.env.COINGECKO_URL || 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const solPriceInUsd = response.data.solana.usd;
        const wallets = await prisma.solanaWallet.findMany();
        for (const wallet of wallets) {
            const transactions = await (0, solana_1.getLatestTransactions)(wallet.address);
            for (const transaction of transactions) {
                const amountTransferredUSD = (0, solana_1.checkForLargeTransaction)(transaction, solPriceInUsd);
                console.log(`start-------------amountTransferredUSD ${amountTransferredUSD} wallet threshold ${wallet.threshold}`);
                if (amountTransferredUSD !== 0 && amountTransferredUSD >= wallet.threshold) {
                    const message = `Whale Alert! A transaction of $${amountTransferredUSD} SOL was detected. https://solscan.io/tx/${transaction.transaction.signatures[0]}`;
                    const transactionTweeted = await prisma.transaction.findFirst({
                        where: {
                            signature: transaction.transaction.signatures[0],
                            tweeted: true
                        }
                    });
                    if (!transactionTweeted) {
                        console.log(`end-------------message ${message}`);
                        await rwClient.v2.tweet(message);
                        await (0, solana_1.insertTransaction)(wallet, transaction, amountTransferredUSD);
                    }
                    else {
                        console.log('end-------------Transaction already tweeted');
                    }
                }
                else {
                    console.log('end-------------Transaction below threshold');
                }
            }
        }
        res.status(200).json({
            message: "Monitoring completed"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});
app.get("/status", async (req, res) => {
    try {
        res.status(200).json({
            message: "Ok"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});
// Import routes
const token_routes_1 = __importDefault(require("./routes/token.routes"));
const webhook_route_1 = __importDefault(require("./routes/webhook.route"));
// Use routes
app.use('/api/token', token_routes_1.default);
app.use('/api/webhook', webhook_route_1.default);
app.listen(3003, () => {
    console.log("server is running on port 3003");
});
// Schedule a task to hit the API every minute
const url = process.env.API_URL || 'http://localhost:3003/monitor';
node_cron_1.default.schedule('*/15 * * * *', () => {
    axios_1.default.get(url)
        .then(response => {
        console.log('API hit:', response.data);
    })
        .catch(error => {
        console.error('Error hitting API:', error);
    });
});
