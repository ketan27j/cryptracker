import express from 'express';
import { connectAndCreateHeliusAlertTable, storeUserDatabaseConnection } from '../dbconnections';

const router = express.Router();

router.get("/status", async (req, res) => {
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

router.post("/connect-database", async (req: any, res: any) => {
    try {
        const { host, port, databaseName, userName, password } = req.body;
        console.log("req.user", req.user);
        // Validate required parameters
        if (!host || !port || !databaseName || !userName || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters. Please provide host, port, databaseName, userName, and password."
            });
        }
        
        // Convert port to number if it's a string
        const portNumber = typeof port === 'string' ? parseInt(port, 10) : port;
        
        // Call the database connection function
        const isConnected = await connectAndCreateHeliusAlertTable(
            host,
            portNumber,
            databaseName,
            userName,
            password
        );
        
        if (isConnected) {
            const savedConnectionInfo = await storeUserDatabaseConnection(
                host,
                portNumber,
                databaseName,
                userName,
                password,
                req.user.id
            );
            if (savedConnectionInfo) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully connected to database, created HeliusAlert table and saved user database connection information"
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Failed to save user database connection information"
                });
            }
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to connect to database or create HeliusAlert table"
            });
        }
    } catch (error) {
        console.error("Error in connect-database route:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error)
        });
    }
});

export default router;