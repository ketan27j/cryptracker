import axios from "axios";
import express from "express";
import TwitterApi from "twitter-api-v2";
import { PrismaClient } from 'prisma-shared';
import { checkForLargeTransaction, getLatestTransactions, insertTransaction } from "./utils/solana";
import dotenv from 'dotenv';
import cron from 'node-cron';
import cors from 'cors';

dotenv.config();
const prisma = new PrismaClient();
const app = express()

// Middleware
app.use(cors());
app.use(express.json());

app.get("/monitor", async (req, res) => {
    try {
        const twitterClient = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY || '',
            appSecret: process.env.TWITTER_API_SECRET || '',
            accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
            accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
          });
        const rwClient = twitterClient.readWrite;
        const response = await axios.get(process.env.COINGECKO_URL || 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
        const solPriceInUsd = response.data.solana.usd;
        const wallets = await prisma.solanaWallet.findMany();
        for (const wallet of wallets) {
        const transactions = await getLatestTransactions(wallet.address);
        for (const transaction of transactions) {
            const amountTransferredUSD = checkForLargeTransaction(transaction, solPriceInUsd)
            console.log(`start-------------amountTransferredUSD ${amountTransferredUSD} wallet threshold ${wallet.threshold}`);
            if (amountTransferredUSD !== 0 && amountTransferredUSD >= wallet.threshold) {
                const message = `Whale Alert! A transaction of $${amountTransferredUSD} SOL was detected. https://solscan.io/tx/${transaction.transaction.signatures[0]}`;
                const transactionTweeted = await prisma.transaction.findFirst({
                    where: {
                        signature: transaction.transaction.signatures[0],
                        tweeted: true
                    }
                });
                if(!transactionTweeted) {
                    console.log(`end-------------message ${message}`);
                    await rwClient.v2.tweet(message);
                    await insertTransaction(wallet, transaction, amountTransferredUSD);
                    } else {
                        console.log('end-------------Transaction already tweeted');
                    }
                } else {
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
}});

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
import tokenRoutes from './routes/token.routes';
import webhookRoutes from './routes/webhook.route';

// Use routes
app.use('/api/token', tokenRoutes);
app.use('/api/webhook', webhookRoutes);

app.listen(3003, () => {
    console.log("server is running on port 3003");
})

// Schedule a task to hit the API every minute
const url = process.env.API_URL || 'http://localhost:3003/monitor';
cron.schedule('*/15 * * * *', () => {
    axios.get(url)
      .then(response => {
        console.log('API hit:', response.data);
      })
      .catch(error => {
        console.error('Error hitting API:', error);
      });
  });