/* eslint-disable prettier/prettier */
import { Schema, model, Document, Types } from "mongoose";
export interface Category {
	_id: Types.ObjectId;
	name: string;
	image: string;
	parentId?: String;
	fields: Field[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface subCategoryFields {
	[key: string]: any;
}

export interface Field {
	name: string;
	fieldType: "single" | "multiple";
	values: {
		id: string;
		name: string;
	};
}

export interface OfferForRent {
	currency: string;
	day1Offer: number;
	day3Offer: number;
	day7Offer: number;
	overtimePercentage: number;
	totalReplacementValue: number;
}

export interface OfferForSell {
	currency: string;
	pricing: number;
	acceptOffers: boolean;
	shipping: {
		shippingOffer: boolean;
		offerLocalPickup: boolean;
		shippingCosts: boolean;
	};
}

export interface Perks {
	buyNow: boolean;
	freeShipping: boolean;
	makeOffer: boolean;
	pickup: boolean;
	shipping: boolean;
	terms: boolean;
}

export interface OfferBoth extends OfferForRent, OfferForSell {}
export interface Items {
	quantity?: number;
	name?: string;
}
export enum ListingStatus {
	Available = "available",
	Unavailable = "unavailable",
	Inuse = "inuse",
	Draft = "draft",
}

export enum ListingCondition {
	New = "new",
	LikeNew = "like new",
	Excellent = "excellent",
	Good = "good",
	WellUsed = "well used",
	HeavilyUSed = "heavily used",
	ForParts = "for parts",
}

export enum ListingType {
	Rent = "rent",
	Sell = "sell",
	Both = "both",
}

export interface ListingLocation {
	address?: string;
	city?: string;
	state: string;
	country: string;
	coords: {
		longitude: number;
		latitude: number;
	};
}
export interface Listing extends Document {
	user: Types.ObjectId;
	productName: string;
	productSlug: string;
	category: Types.ObjectId;
	subCategory: Types.ObjectId;
	fieldValues: subCategoryFields;
	productionType: string;
	description: string;
	listingPhotos: string[];
	listingType: ListingType;
	condition: ListingCondition;
	offer: {
		forRent?: OfferForRent;
		forSell?: OfferForSell;
		//both?: OfferBoth;
	};
	perks: Perks;
	items: Items[];
	amount: number;
	contractId?: string;
	nftTokenId?: string;
	transactionId?: string;
	status: ListingStatus;
	location: ListingLocation;
	createdAt: Date;
	updatedAt: Date;
}

export interface SearchQuery {
	category?: string;
	description?: string;
	productName?: string;
	listingType?: string;
	location?: Partial<ListingLocation>
}
