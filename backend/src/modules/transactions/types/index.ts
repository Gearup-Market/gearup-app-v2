import { PaymentMethod, WTransactionStatus } from "@/modules/wallet/types";
import { Document, Types } from "mongoose";

export enum TransactionType {
	Rental = "Rental",
	Sale = "Sale",
}

export enum TransactionStatus {
	Confirming = 'confirming',
	Pending = "pending",
	Ongoing = "ongoing",
	Completed = "completed",
	Cancelled = "cancelled",
	Declined = "declined",
}

export enum TransactionStage {
	AwaitingPayment = 'AwaitingPayment',
	PendingApproval = 'PendingApproval',
    ConfirmHandover = 'ConfirmHandover',
    AwaitingConfirmation = 'AwaitingConfirmation',
    TransactionOngoing = 'TransactionOngoing',
    InitiateReturn = 'InitiateReturn',
    ConfirmReturn = 'ConfirmReturn',
    StatusReport = 'StatusReport',
    Completed = 'Completed',
    ReviewAndFeedback = 'ReviewAndFeedback',
    Declined = 'Declined'
}

export interface TransactionConfirmations {
	sellerAccept: boolean;
	buyerHandover: boolean;
	itemReturn: boolean;
	sellerReturnConfirmation: boolean;
}

export enum ShippingType {
	Shipping = 'shipping',
	LocalPickup = 'localpickup'
}

export type StageSchema = { updatedAt: Date; stage: TransactionStage, transactionHash: string; isCurrent: boolean  };
export type TransactionStageSchema = { buyer: StageSchema; seller: StageSchema };
export type MetadataSchema = {
	thirdPartyCheckup?: boolean;
	shippingType?: ShippingType;
	country?: string;
	name?: string;
	company?: string;
	address?: string;
	city?: string;
	postalCode?: string;
	phoneNumber?: string;
} 

export interface Transaction extends Document {
	item: string;
	buyer: string;
	seller: string;
	type: TransactionType;
	status: TransactionStatus;
	amount: number;
	rentalPeriod?: RentalPeriod;
	payment: string;
	metadata?: MetadataSchema;
	reference: string;
	stages: StageSchema[];
    reviews: {
		buyerReviewed: boolean;
		sellerReviewed: boolean;
	}
    confirmations: TransactionConfirmations;
	createdAt: Date;
	updatedAt?: Date;
}

export interface TransactionPayload extends Omit<Transaction, "status" | "createdAt"> {
	description: string;
	status: WTransactionStatus;
	method: PaymentMethod;
}

export interface Cart extends Document {
	user: Types.ObjectId;
	items: CartItem[];
	totalAmount: number;
	createdAt: Date;
	updatedAt?: Date;
}

export type RentalPeriod = {
	start: Date;
	end: Date;
};

export interface CartItem {
	listing: Types.ObjectId;
	type: TransactionType;
	rentalPeriod?: RentalPeriod;
	price?: number;
}
