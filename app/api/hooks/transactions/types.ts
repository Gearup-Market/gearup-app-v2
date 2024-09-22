import { Listing } from "@/store/slices/listingsSlice";
import { AxiosError } from "axios";

export enum TransactionType {
	Rental = "Rental",
	Sale = "Sale"
}

export interface CartReq {
	userId: string;
	listingId: string;
	type: TransactionType;
	rentalPeriod?: RentalPeriod;
	customPrice?: number;
}

export type RentalPeriod = {
	start: Date;
	end: Date;
};

export interface CartItem {
	id?: string;
	listing: Listing;
	type: TransactionType;
	rentalPeriod?: RentalPeriod;
	price?: number;
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
}

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
	amount: number;
	buyer: string;
	seller: string;
	item: Listing;
	status: string;
	type: TransactionType
}

export interface iPostTransactionRes {
	data: Transaction;
	message: string;
}

export interface iGetTransactionRes {
	data: Transaction[];
	message: string;
}