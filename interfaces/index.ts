// navlink interfaces

import { iWTransaction } from "@/app/api/hooks/wallets/types";
import { User } from "./User";
import { RentalBreakdown, UserRole } from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";
import { Course } from "@/store/slices/coursesSlice";
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
	Buy = "sell",
	Rent = "rent",
	Both = "both"
}

export enum ThirdPartyCheckupStage {
	AwaitingThirdPartyDelivery = "awaiting_third_party_delivery",
	ThirdPartyReceived = "third_party_received",
	ThirdPartyInspecting = "third_party_inspecting",
	ThirdPartyReportProvided = "third_party_report_provided",
	BuyerReviewingReport = "buyer_reviewing_report",
	BuyerRequestedRefund = "buyer_requested_refund",
	SellerConfirmingReturn = "seller_confirming_return"
}

export enum TransactionStage {
	AwaitingPayment = "awaiting_payment",
	PendingApproval = "payment_received",
	SellerPreparingDelivery = "seller_preparing_delivery",
	SellerShipped = "seller_shipped",
	BuyerReceivedItem = "buyer_received_item",
	RentalOngoing = "rental_ongoing",
	AwaitingItemReturn = "awaiting_item_return",
	ItemReturned = "item_returned",
	AwaitingLenderConfirmation = "awaiting_lender_confirmation",
	ReviewAndFeedback = "review_and_feedback",
	Declined = "Declined",
	Cancelled = "cancelled",
	Completed = "completed",

	AwaitingThirdPartyDelivery = "awaiting_third_party_delivery",
	ThirdPartyReceived = "third_party_received",
	ThirdPartyInspecting = "third_party_inspecting",
	ThirdPartyReportProvided = "third_party_report_provided",
	BuyerReviewingReport = "buyer_reviewing_report",
	BuyerRequestedRefund = "buyer_requested_refund",
	SellerConfirmingReturn = "seller_confirming_return"
}

export enum ShippingType {
	Shipping = "shipping",
	LocalPickup = "localpickup"
}
export type Stage = {
	updatedAt: Date;
	stage: TransactionStage;
	transactionHash: string;
	isCurrent: boolean;
};
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
};

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
	listing: Listing | Course;
	isBuyer: boolean;
	payment: iWTransaction;
	stages: Stage[];
	reviews: {
		buyerReviewed: boolean;
		sellerReviewed: boolean;
	};
	metadata?: MetadataSchema;
	rentalBreakdown: RentalBreakdown[];
	itemType: string;
	createdAt: string;
}

export enum TransactionStatus {
	Pending = "pending",
	Ongoing = "ongoing",
	Completed = "completed",
	Cancelled = "cancelled",
	Declined = "declined"
}
