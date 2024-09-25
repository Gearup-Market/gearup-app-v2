import { StellarConfiguration, Wallet } from "@stellar/typescript-wallet-sdk";
import { isStellarMainnet } from "@/core/utils/environment";
import { Horizon } from "@stellar/stellar-sdk";

export const wallet = new Wallet({
	stellarConfiguration: isStellarMainnet()
		? StellarConfiguration.MainNet()
		: StellarConfiguration.TestNet(),
});

const horizonUrl = isStellarMainnet()
	? "https://horizon-mainnet.stellar.org"
	: "https://horizon-testnet.stellar.org";

export const server = new Horizon.Server(horizonUrl);

export const stellarExplorer = isStellarMainnet()
	? "https://lumenscan.io"
	: "https://testnet.lumenscan.io";

export const stellar = wallet.stellar();

export * from "@stellar/stellar-sdk";
