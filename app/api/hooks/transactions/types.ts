import { User } from "@/interfaces/User";
import { Listing } from "@/store/slices/listingsSlice";
import { AxiosError } from "axios";
import { iWTransaction } from "../wallets/types";
import { MetadataSchema, Stage, TransactionStage, TransactionStatus } from "@/interfaces";
import { RentingOfferRates } from "@/interfaces/Listing";
import { Course } from "@/store/slices/coursesSlice";

export enum TransactionType {
	Rental = "Rental",
	Sale = "Sale"
}

export interface CartReq {
	userId: string;
	listingId: string;
	type: TransactionType;
	rentalBreakdown: RentalBreakdown[];
	customPrice?: number;
	listingModelType?: "Listing" | "Course";
}

export type RentalBreakdown = {
	date: Date;
	duration: string;
	quantity: number;
	price: number;
};

export interface CartItem {
	id?: string;
	listing: Listing | Course;
	type: TransactionType;
	listingModelType?: "Listing" | "Course";
	rentalBreakdown: RentalBreakdown[];
	price?: number;
	vat?: number;
	serviceFee?: number;
	appliedRate?: RentingOfferRates;
}

export type iPostAddCartReq = CartReq;

export type Cart = {
	user: string;
	items: CartItem[];
	totalAmount: number;
	createdAt: Date;
	updatedAt?: Date;
	_id: string;
};

export type iPostRemoveCartReq = {
	userId: string;
	listingId: string;
};

export interface iPostAddCartRes {
	data: Cart;
	message: string;
}

export interface iGetCartResp {
	data: Cart;
	message: string;
}

export type iPostCartErr = AxiosError<{
	error: string;
}>;

export interface Transaction {
	_id: string;
	item: Listing | Course;
	buyer: string;
	seller: string;
	type: TransactionType;
	status: TransactionStatus;
	amount: number;
	rentalBreakdown: RentalBreakdown[];
	payment: string;
	metadata: MetadataSchema;
	stages: Stage[];
	reviews: {
		buyerReviewed: boolean;
		sellerReviewed: boolean;
	};
	createdAt: string;
	updatedAt?: string;
	itemType: string;
}

export interface iPostTransactionRes {
	data: Transaction;
	message: string;
}

export interface iPostTransactionStageReq {
	id: string;
	stage: TransactionStage;
	authority: {
		id: string;
		role: "seller" | "buyer";
	};
	status?: TransactionStatus;
}

export interface iPostTransactionStatusReq {
	id: string;
	status: TransactionStatus;
	authority: {
		id: string;
		role: "seller" | "buyer";
	};
}

export interface iGetTransactionRes {
	data: Transaction[];
	message: string;
	pagination: {
		currentPage: number;
		totalPages: number;
		totalCount: number;
		limit: number;
	};
}

export type SingleTransaction = Omit<
	Transaction,
	"buyer" | "seller" | "payment" | "item"
> & {
	buyer: User;
	seller: User;
	item: Listing | Course;
	payment: iWTransaction;
	updatedAt?: Date;
};

export interface iGetSingleTransactionRes {
	data: SingleTransaction;
	message: string;
}

export enum UserRole {
	Seller = "seller",
	Buyer = "buyer",
	Lender = "lender",
	Renter = "renter"
}
