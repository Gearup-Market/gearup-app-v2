import { iCategory } from "@/app/api/hooks/listings/types";

export interface Product {
	productName: string;
	category: {
		main: string;
		sub: string;
	};
	subCategoryDescription: {
		features: string[];
		brand: string;
	};
	description: string;
	listingsPhoto: string[];
	listingType: string;
	gearCondition: string;
	offer: {
		currency: string;
		"1dayOffer": number;
		"3daysOffer": number;
		"7daysOffer": number;
		overtimePercentage: number;
		totalReplacementValue: number;
	};
	user: string;
}

export interface ListingResponse {
	data: {
		productName: string;
		category: {
			_id: string;
		};
		subCategoryDescription: {
			_id: string;
		};
		description: string;
		listingPhotos: string[];
		listingType: "renting" | "selling";
		gearCondition: string;
		user: {
			_id: string;
			userId: string;
			email: string;
			password: string;
			name: string;
			verificationToken: string;
			isVerified: boolean;
			resetPasswordToken: string;
			createdAt: string;
			resetPasswordTokenExpiry: string;
			__v: number;
		};
		_id: string;
		__v: number;
	};
	message: string;
}

interface Category {
	id: number | string;
	name: string;
}

interface Price {
	value: number;
	enabled: boolean;
}

export interface Item {
	id: number | string;
	quantity: number;
	name: string;
}

export interface AddListing {
	id?: number | string;
	items?: Item[];
	title?: string;
	category?: Category;
	subCategory?: Category;
	fieldValues?: {
		[key: string]: string | string[];
	};
	description?: string;
	images?: string[];
	// images?: { id: string | null; url: string; fileName: string; type: string }[];
	currency?: { name: string; symbol: string };
	price1Day?: Price;
	price3Days?: Price;
	price7Days?: Price;
	price30Days?: Price;
	buyPrice?: number;
	listingType?: string;
	condition?: string;
	type?: string[];
	perks?: {
		buyNow: boolean;
		freeShipping: boolean;
		makeOffer: boolean;
		pickup: boolean;
		shipping: boolean;
		terms: boolean;
	};
}

interface SubCategoryFields {
	brand: string;
	model: string;
	sensorType: string;
	megapixels: string;
	videoResolution: string;
}

export interface SellingOffer {
	currency?: string;
	pricing?: number;
	acceptOffers?: boolean;
	shipping?: {
		shippingOffer?: boolean;
		offerLocalPickup?: boolean;
		shippingCosts?: boolean;
	};
}

export interface RentingOffer {
	currency?: string;
	pricing?: number;
	rates: RentingOfferRates[];
	overtimePercentage?: number;
	totalReplacementValue?: number;
}

export interface RentingOfferRates {
	duration: string;
	quantity: number;
	price: number;
}

interface Category {
	id: number | string;
	name: string;
}

interface Price {
	value: number;
	enabled: boolean;
}

export interface Item {
	id: number | string;
	quantity: number;
	name: string;
}

export interface ListingState {
	_id?: string;
	productName: string;
	items: Item[];
	category?: iCategory;
	subCategory?: iCategory;
	productionType: string;
	description: string;
	listingPhotos: string[];
	tempPhotos?: File[];
	listingType: string;
	condition?: string;
	userId: string;
	fieldValues: {
		[key: string]: string | string[];
	};
	offer: {
		forSell?: SellingOffer;
		forRent?: RentingOffer;
	};
	location: {
		city: string;
		country: string;
		state: string;
		address: string;
		coords: {
			latitude: number;
			longitude: number;
		};
	};
	perks?: {
		buyNow: boolean;
		freeShipping: boolean;
		makeOffer: boolean;
		pickup: boolean;
		shipping: boolean;
		terms: boolean;
	};
	allowsMultiOwnership?: boolean;
	maxSharePurchase?: number;
	minSharePurchase?: number;
	totalShares?: number;
	reservedShares?: number;
}

interface SelectedValue {
	id: number;
	name: string;
}

interface Field {
	name: string;
	selectedValues: SelectedValue[];
	fieldType: "single" | "multiple";
}

export enum DayOfferEnum {
	ONE = 1,
	THREE = 3,
	SEVEN = 7,
	THIRTY = 30
}

export type Filter = {
	id: string | number;
	name: string;
	subFilters: Omit<Filter, "subFilters">[];
};
