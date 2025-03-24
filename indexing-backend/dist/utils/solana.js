"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForLargeTransaction = void 0;
exports.getLatestTransactions = getLatestTransactions;
exports.insertTransaction = insertTransaction;
const prisma_shared_1 = require("prisma-shared");
const web3_js_1 = require("@solana/web3.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new prisma_shared_1.PrismaClient();
const connection = new web3_js_1.Connection(process.env.SOLANA_MAINNET || 'https://api.mainnet-beta.solana.com');
async function getLatestTransactions(walletAddress) {
    const publicKey = new web3_js_1.PublicKey(walletAddress);
    const transactionList = await getSignaturesWithRetry(publicKey, { limit: 10 });
    // console.log(transactionList);
    const output = [];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (const transaction of transactionList) {
        // await delay(1000);
        const details = await connection.getParsedTransaction(transaction.signature);
        if (details) {
            output.push(details);
        }
    }
    return output;
}
;
async function getSignaturesWithRetry(publicKey, options, retries = 5) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempt ${i + 1} to get signatures for address ${publicKey.toString()}`);
            const signatures = await connection.getSignaturesForAddress(publicKey, options);
            return signatures;
        }
        catch (error) {
            if (error.message.includes('429')) {
                const retryAfter = 11000; // Exponential backoff with jitter
                console.log(`Rate limited. Retrying after ${retryAfter} ms...`);
                await delay(retryAfter);
            }
            else {
                throw error;
            }
        }
    }
    throw new Error('Too many requests, please try again later.');
}
const checkForLargeTransaction = (transactionDetails, solPriceInUsd) => {
    if (!transactionDetails || !transactionDetails.meta)
        return 0;
    const preBalances = transactionDetails.meta.preBalances;
    const postBalances = transactionDetails.meta.postBalances;
    if (!preBalances || !postBalances)
        return 0;
    let amountTransferred = 0;
    for (let i = 0; i < preBalances.length; i++) {
        const balanceChange = (postBalances[i] ?? 0) - (preBalances[i] ?? 0);
        if (Math.abs(balanceChange) > amountTransferred) {
            amountTransferred = balanceChange;
        }
    }
    const amountTransferredSOL = (Math.abs(amountTransferred) / web3_js_1.LAMPORTS_PER_SOL);
    const amountTransferredUSD = amountTransferredSOL * solPriceInUsd;
    // console.log(`preBalances: ${preBalances} postBalances: ${postBalances} amountTransferredSOL: ${amountTransferredSOL} amountTransferredUSD: ${amountTransferredUSD}`);
    return amountTransferredUSD;
};
exports.checkForLargeTransaction = checkForLargeTransaction;
async function insertTransaction(wallet, transaction, amountTransferredUSD) {
    await prisma.transaction.create({
        data: {
            walletId: wallet.id,
            amount: amountTransferredUSD,
            signature: transaction.transaction.signatures[0] ?? '',
            tweeted: true,
            timestamp: new Date(),
        },
    });
}
