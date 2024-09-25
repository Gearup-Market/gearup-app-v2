import { PaymentMethod, WTransactionStatus } from "@/modules/wallet/types";
import { Document, Types } from "mongoose";

export enum TransactionType {
	Rental = "Rental",
	Sale = "Sale",
}

export enum TransactionStatus {
	Pending = "pending",
	Ongoing = "ongoing",
	Completed = "completed",
	Cancelled = "cancelled",
	Declined = "declined",
}

export enum TransactionStage {
	PendingApproval = 'PendingApproval',
    ConfirmHandover = 'ConfirmHandover',
    AwaitingConfirmation = 'AwaitingConfirmation',
    TransactionOngoing = 'TransactionOngoing',
    InitiateReturn = 'InitiateReturn',
    ConfirmReturn = 'ConfirmReturn',
    Completed = 'Completed',
    ReviewAndFeedback = 'ReviewAndFeedback',
    Declined = 'Declined'
}

/*
Let's review the stages again for both buyers, renters, lenders and sellers and corresponding actions

Lender:
1. Pending approval -> action -> accept/declined
2. confirm handover -> action -> confirm item shipped to renter
3. Awaiting confirmation -> no action from lender
4. Transaction ongoing -> no action from lender
5. confirm return -> action -> confirms lender has received back the item (this stage also sets status as completed)
6. review and feedback

Renter: 
1. Awaiting approval -> no action
2. confirm handover -> action -> confirms item receipt from lender (triggered when lender confirm handover)
3. Transaction ongoing -> action -> moves to next step
4. Initiate return -> action -> confirm has delivered item to lender
5. Awaiting confirmation -> no action
6. Review and feedback
*/

export interface TransactionConfirmations {
	sellerAccept: boolean;
	buyerHandover: boolean;
	itemReturn: boolean;
	sellerReturnConfirmation: boolean;
}

export type StageSchema = { updatedAt: Date; stage: TransactionStage };
export type TransactionStageSchema = { buyer: StageSchema; seller: StageSchema };


export interface Transaction extends Document {
	item: string;
	buyer: string;
	seller: string;
	type: TransactionType;
	status: TransactionStatus;
	amount: number;
	rentalPeriod?: RentalPeriod;
	payment: string;
	metadata: any;
	reference: string;
	stage: {
		stage: TransactionStage;
		updatedAt: Date;
	};
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
