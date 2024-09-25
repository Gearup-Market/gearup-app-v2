const {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Keypair,
  nativeToScVal,
  Address,
  SorobanRpc,
  xdr,
} = require("@stellar/stellar-sdk");
require("dotenv").config();

const adminKeypair = Keypair.fromSecret(process.env.ADMIN_SECRET);
const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org:443");

function decodeResponse(responseValue) {
  const returnValue = xdr.ScVal.fromXDR(responseValue, "base64");

  switch (returnValue.switch().name) {
    case "scvAddress":
      const returnedAddress = Address.fromScAddress(returnValue.address());
      return returnedAddress.toString();

    case "scvU32":
      return returnValue.u32();

    case "scvI32":
      return returnValue.i32();

    case "scvU64":
      return returnValue.u64().toString(); // Convert to string to preserve precision

    case "scvI64":
      return returnValue.i64().toString(); // Convert to string to preserve precision

    case "scvI128":
      return returnValue.i64().toString(); // Convert to string to preserve precision

    case "scvBool":
      return returnValue.b();

    default:
      console.log("Unexpected return value type:", returnValue.switch().name);
      return returnValue;
  }
}

async function callContract({ contractId, payload, functionName }) {
  const account = await server.getAccount(adminKeypair.publicKey());
  const contract = new Contract(contractId);

  try {
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(contract.call(functionName, ...payload))
      .setTimeout(30)
      .build();

    const tx = await server.prepareTransaction(transaction);
    tx.sign(adminKeypair);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (response.status === "SUCCESS") {
      console.log("Transaction successful.");
      return response;
    } else {
      console.log("Transaction failed.");
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.log(error?.response?.data?.extras);
    throw error;
  }
}

async function initializeMarketplace() {
  const contractId = "CDO5CKXT6SAHBU2T6IVRJM3G3JDB6X6E2TTMTKHRNWWNIXOLEZZC3YDS"; // marketplace
  const payload = [
    nativeToScVal(Address.fromString(adminKeypair.publicKey())),
    nativeToScVal(
      Address.fromString(
        "CCCUVCZGMRFRYKURHA3M7XKX33NGFC5RQH46GBWE6NVZICYJM3ZDL4UJ"
      )
    ),
    nativeToScVal(
      Address.fromString(
        "CBOFAQ3QPA3Z3LFP25JG4QFQY7EYR2Y24VLJQWMZRRARF2W4HKUY4V67"
      )
    ),
    nativeToScVal(
      Address.fromString(
        "CAHI7D4MCHRL2W3TDT5YC5UP5WG4EEIBB4TUPR3LN5WTACDTOPCUUS4Z"
      )
    ),
  ];

  try {
    const result = await callContract({
      contractId,
      payload,
      functionName: "initialize",
    });
    console.log("Contract initialization successful.", result?.returnValue);
  } catch (error) {
    console.log("Contract initialization failed:", error);
  }
}

async function initializeAgreement() {
  const contractId = "CBOFAQ3QPA3Z3LFP25JG4QFQY7EYR2Y24VLJQWMZRRARF2W4HKUY4V67";
  const payload = [
    nativeToScVal(Address.fromString(adminKeypair.publicKey())),
    nativeToScVal(
      Address.fromString(
        "CDO5CKXT6SAHBU2T6IVRJM3G3JDB6X6E2TTMTKHRNWWNIXOLEZZC3YDS"
      )
    ),
  ];

  try {
    const result = await callContract({
      contractId,
      payload,
      functionName: "initialize",
    });

    const res = decodeResponse(result?.returnValue);
    console.log("Contract initialization successful.", res);
  } catch (error) {
    console.log("Contract initialization failed:", error);
  }
}

async function initializeEscrow() {
  const contractId = "CAHI7D4MCHRL2W3TDT5YC5UP5WG4EEIBB4TUPR3LN5WTACDTOPCUUS4Z";
  const payload = [
    nativeToScVal(Address.fromString(adminKeypair.publicKey())),
    nativeToScVal(
      Address.fromString(
        "CDO5CKXT6SAHBU2T6IVRJM3G3JDB6X6E2TTMTKHRNWWNIXOLEZZC3YDS"
      )
    ),
  ];

  try {
    const result = await callContract({
      contractId,
      payload,
      functionName: "initialize",
    });
    const res = decodeResponse(result?.returnValue);
    console.log("Contract initialization successful.", res);
  } catch (error) {
    console.log("Contract initialization failed:", error);
  }
}

async function initializeNFT() {
  const contractId = "CCCUVCZGMRFRYKURHA3M7XKX33NGFC5RQH46GBWE6NVZICYJM3ZDL4UJ";
  const payload = [
    nativeToScVal(Address.fromString(adminKeypair.publicKey())),
    nativeToScVal(
      Address.fromString(
        "CDO5CKXT6SAHBU2T6IVRJM3G3JDB6X6E2TTMTKHRNWWNIXOLEZZC3YDS"
      )
    ),
  ];

  try {
    const result = await callContract({
      contractId,
      payload,
      functionName: "initialize",
    });
    const res = decodeResponse(result?.returnValue);
    console.log("Contract initialization successful.", res);
  } catch (error) {
    console.log("Contract initialization failed:", error);
  }
}

// async function main() {
//   await initializeMarketplace();
//   await initializeAgreement();
//   await initializeEscrow();
//   await initializeNFT();
// }

// main();
