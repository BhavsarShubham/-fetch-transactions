// index.mjs
import express from 'express';
import Web3 from 'web3';

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;


const INFURA_PROJECT_ID = '645dda60dd2f43c78467a695feaf4ef3'; 
const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`); 

// Sample wallet address
const walletAddress = '0x2e8E610Aff4ee99A3e2cE5e366f4f437EB63524a';



// Define the GET API endpoint
app.get('/transactions/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;

    try {
        // Validate wallet address format
        if (!web3.utils.isAddress(walletAddress)) {
            return res.status(400).json({ error: 'Invalid wallet address format.' });
        }

        // Fetch transaction count for the wallet address
        const transactionCount = await web3.eth.getTransactionCount(walletAddress);
        const transactionData = [];

        for (let i = 0; i < transactionCount; i++) {
            // Fetch each transaction (example method, adjust as needed)
            const transaction = await web3.eth.getTransactionFromBlock(walletAddress, i);
            transactionData.push(transaction);
        }

        res.json({ transactions: transactionData });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching transactions.' });
    }
});



// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
