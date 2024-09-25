const StellarSDK = require("@stellar/stellar-sdk");
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function uploadWasm(filePath) {
	const bytecode = await fs.readFile(filePath);
	const account = await server.getAccount(sourceKeypair.publicKey());
	const operation = StellarSDK.Operation.uploadContractWasm({ wasm: bytecode });
	return await buildAndSendTransaction(account, operation);
}

async function deployContract(response) {
	const account = await server.getAccount(sourceKeypair.publicKey());
	const operation = StellarSDK.Operation.createCustomContract({
		wasmHash: response.returnValue.bytes(),
		address: StellarSDK.Address.fromString(sourceKeypair.publicKey()),
		salt: response.hash,
	});
	const responseDeploy = await buildAndSendTransaction(account, operation);
	const contractAddress = StellarSDK.StrKey.encodeContract(
		StellarSDK.Address.fromScAddress(responseDeploy.returnValue.address()).toBuffer()
	);
	console.log(contractAddress);
}

async function buildAndSendTransaction(account, operations) {
	const transaction = new StellarSDK.TransactionBuilder(account, {
		fee: StellarSDK.BASE_FEE,
		networkPassphrase: StellarSDK.Networks.TESTNET,
	})
		.addOperation(operations)
		.setTimeout(30)
		.build();

	const tx = await server.prepareTransaction(transaction);
	tx.sign(sourceKeypair);

	console.log("Submitting transaction...");
	let response = await server.sendTransaction(tx);
	const hash = response.hash;
	console.log(`Transaction hash: ${hash}`);
	console.log("Awaiting confirmation...");

	while (true) {
		response = await server.getTransaction(hash);
		if (response.status !== "NOT_FOUND") {
			break;
		}
		await new Promise(resolve => setTimeout(resolve, 1000));
	}

	if (response.status === "SUCCESS") {
		console.log("Transaction successful.");
		return response;
	} else {
		console.log("Transaction failed.");
		throw new Error("Transaction failed");
	}
}

const server = new StellarSDK.SorobanRpc.Server(
	"https://soroban-testnet.stellar.org:443"
);

const sourceKeypair = StellarSDK.Keypair.fromSecret(process.env.ADMIN_SECRET);

async function findWasmFile(directory, contractName) {
	const files = await fs.readdir(directory);
	const wasmFile = files.find(file => path.extname(file).toLowerCase() === ".wasm" && file.includes(contractName));
	if (wasmFile) {
		return path.join(directory, wasmFile);
	}
	throw new Error("No .wasm file found in the specified directory");
}

async function main() {
	try {
		const currentDir = __dirname;
		const contractDir = path.join(currentDir, "contracts");
		const contractName = 'agreement.wasm';
		console.log("Searching for WASM file in:", contractDir);

		const wasmFilePath = await findWasmFile(contractDir, contractName);
		console.log("Found WASM file:", wasmFilePath);

		let uploadResponse = await uploadWasm(wasmFilePath);
		await deployContract(uploadResponse);
	} catch (error) {
		console.log(error);
	}
}

main();
