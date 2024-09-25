const { Horizon, Contract, TransactionBuilder, Networks, BASE_FEE, Keypair } = require('@stellar/stellar-sdk');
require('dotenv').config();

const adminKeypair = Keypair.fromSecret(process.env.ADMIN_SECRET);

async function initializeContract(contractId, adminPublicKey) {
    const server = new Horizon.Server("https://horizon-testnet.stellar.org");
    if (adminKeypair.publicKey() !== adminPublicKey) {
        throw new Error('The provided admin public key does not match the keypair');
    }

    const account = await server.loadAccount(adminKeypair.publicKey());

    const contract = new Contract(contractId);

    try {
        const transaction = new TransactionBuilder(account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call('initialize', adminPublicKey))
            .setTimeout(30)
            .build();

        transaction.sign(adminKeypair);
        const result = await server.submitTransaction(transaction);
        console.log('Transaction result:', result);
        return result;
    } catch (error) {
        console.error('Error calling initialize function:', error);
        throw error;
    }
}

async function main() {
    const contractId = 'CCBNKNND4FIYE7HNLFIQLEY2HXIWYNJ3CM7C2CGHSCNDDMA5OC67DVUM';
    const adminPublicKey = adminKeypair.publicKey();

    console.log(`Calling initialize function for contract ID: ${contractId}`);
    
    try {
        const result = await initializeContract(contractId, adminPublicKey);
        console.log('Contract initialization successful.', result);
    } catch (error) {
        console.log('Contract initialization failed:', error.message);
    }
}

main();