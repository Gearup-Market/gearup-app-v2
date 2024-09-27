// navlink interfaces

import { iWTransaction } from "@/app/api/hooks/wallets/types";
import { User } from "./User";
import { RentalPeriod, UserRole } from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";

export interface NavLinkMenu {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	icon?: string;
}

export interface NavLinkSub {
	label: string;
	menu: NavLinkMenu[];
}

export interface NavLink {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	videoUrl?: string;
	subMenu?: NavLinkSub[];
	title?: string;
	description?: string;
	button?: string;
	icon: string;
}

// platform

export interface Platfom {
	title: string;
	description: string;
	url: string;
	urlLabel: string;
	id: number;
}

// categories

export interface Categories {
	title: string;
	image: string;
	url: string;
}

// listings

export interface Listings {
	label?: string;
	type?: "rent" | "buy";
	image?: string;
	user?: string;
	avatar?: string;
	reviews?: number;
	price?: number;
}

// courses

export interface Courses {
	label: string;
	image: string;
	user: string;
	avatar: string;
	reviews: number;
	price: number;
	type: "ebook" | "live" | "audio" | "video";
}

export enum ListingType {
	Buy = "buy",
	Rent = "rent",
	Both = "both"
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
    Declined = 'Declined',
}
export enum ShippingType {
	Shipping = 'shipping',
	LocalPickup = 'localpickup'
}
export type Stage = { updatedAt: Date; stage: TransactionStage, transactionHash: string; isCurrent: boolean  };
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

export interface iTransactionDetails {
	id: string;
	gearName: string;
	amount: number;
	transactionDate: string;
	transactionType: string;
	transactionStatus: TransactionStatus;
	gearImage: string;
	userRole: UserRole;
	buyer: User;
	seller: User;
	listing: Listing;
	isBuyer: boolean;
	payment: iWTransaction;
	stages: Stage[];
	metadata?: MetadataSchema
	rentalPeriod?: RentalPeriod;
}

export enum TransactionStatus {
	Pending = "pending",
	Ongoing = "ongoing",
	Completed = "completed",
	Cancelled = "cancelled",
	Declined = "declined",
}
