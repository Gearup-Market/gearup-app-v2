import { Horizon } from "@stellar/stellar-sdk";
import BigNumber from "bignumber.js";

const horizonUrl = process.env.NEXT_APP_STELLAR_MAINNET
	? "https://horizon-mainnet.stellar.org"
	: "https://horizon-testnet.stellar.org";

export const server = new Horizon.Server(horizonUrl);

export async function calculateTotalCost(
	amount: string,
	includeFeeFromSource: boolean = true
): Promise<{ total: string; fee: string }> {
	try {
		const fee = await server.fetchBaseFee();
		const amountBN = new BigNumber(amount);
		const feeBN = new BigNumber(fee.toString()).dividedBy(10000000); // Convert stroops to XLM
		let totalBN: BigNumber;

		if (includeFeeFromSource) {
			totalBN = amountBN.plus(feeBN);
		} else {
			totalBN = amountBN;
		}

		return {
			total: totalBN.toFixed(7),
			fee: feeBN.toFixed(7)
		};
	} catch (error) {
		console.error("Error calculating total cost:", error);
		throw error;
	}
}
