import ContractClient from "@/lib/stellar/contractClient";
import { ContractFunctions, Contracts, CreateListingProps, PurchaseType } from "./types";
import { isEmpty } from "@/core/utils";
import { HttpException } from "@/core/exceptions/HttpException";
import listingModel from "../../models/listing";
import { ListingType } from "../../types";
import { Types } from "mongoose";

export const contracts: Contracts = {
	Marketplace: "CDO5CKXT6SAHBU2T6IVRJM3G3JDB6X6E2TTMTKHRNWWNIXOLEZZC3YDS",
	Agreement: "CBOFAQ3QPA3Z3LFP25JG4QFQY7EYR2Y24VLJQWMZRRARF2W4HKUY4V67",
	NFT: "CCCUVCZGMRFRYKURHA3M7XKX33NGFC5RQH46GBWE6NVZICYJM3ZDL4UJ",
	Escrow: "CAHI7D4MCHRL2W3TDT5YC5UP5WG4EEIBB4TUPR3LN5WTACDTOPCUUS4Z",
};

class MarketplaceClient extends ContractClient {
	private listing = listingModel;
	constructor() {
		super(contracts.Marketplace);
	}

	public async createListing(payload: CreateListingProps) {
		if (isEmpty(payload)) throw new HttpException(400, "Payload is empty");
		const { userId, listingId, type, duration, price, metadata } = payload;
		const purchase_type =
			type === ListingType.Rent ? PurchaseType.Rent : PurchaseType.Buy;

		const userWallet = await this.model.findOne({ userId }).lean();
		const response = await this.callFunction(
			ContractFunctions.CreateListing,
			payload.userId,
			{ type: "Address", value: userWallet.publicKey },
			{ type: "String", value: listingId },
			{ type: "U32", value: purchase_type },
			{ type: "U64", value: duration },
			{ type: "I128", value: price || 0 },
			{ type: "String", value: metadata || "" }
		);

		if (response) {
			console.log(response, ".,m,.");
			// update listing record
			await this.listing.updateOne(
				{ _id: new Types.ObjectId(listingId) },
				{
					transactionId: response.hash,
					contractId: response.result,
					nftTokenId: response.result,
				}
			);

            return response
		}
	}
}

export default MarketplaceClient;
