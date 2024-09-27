import { ListingType } from "../../types";

export interface Contracts {
    Marketplace: string;
    Agreement: string;
    NFT: string;
    Escrow: string;
}

export interface CreateListingProps {
    listingId: string;
    userId: string;
    type: ListingType;
    duration?: number;
    price: number;
    metadata: string;
}

export enum ContractFunctions {
    CreateListing = 'create_listing'
}

export enum PurchaseType {
    Rent = 1,
    Buy = 2,
}