import { RentingOffer, SellingOffer } from "@/interfaces/Listing";
import { Listing, ListingLocation } from "@/store/slices/listingsSlice";
import { AxiosError } from "axios";

export interface Product {
	productName: string;
	category?: string;
	subCategory?: string;
	productionType: string;
	subCategoryFields: {
		brand: string;
		model: string;
		sensorType: string;
		megapixels: string;
		videoResolution: string;
	};
	description: string;
	listingPhotos: string[];
	listingType: string;
	gearCondition: string;
	offer?: SellingOffer | RentingOffer;
	user: string;
}

export type iPostListingReq = Product;

export interface iPostListingResp {
	data: {
		productName: string;
		category: {
			_id: string;
		};
		subCategory: {
			_id: string;
		};
		description: string;
		listingPhotos: string[];
		listingType: "rent" | "sell";
		condition: string;
		user: {
			_id: string;
			userId: string;
			email: string;
			name: string;
			isVerified: boolean;
		};
		_id: string;
		__v: number;
	};
	message: string;
}

export interface iGetListingsResp {
	data: Listing[];
	message: string;
	meta: { limit: number; total: number; page: number };
}

export interface iGetListingResp {
	data: Listing;
	message: string;
}

export interface iCategory {
	_id: string;
	id: string;
	name: string;
	image: string;
	fields: Field[];
	subCategories: iCategory[];
}

export interface Field {
	name: string;
	fieldType: "single" | "multiple";
	values: {
		id: string;
		name: string;
	};
}

export interface iCategoryDetailed {
	id: string;
	name: string;
	image: string;
	itemsCount: number;
	listings: any[];
}
export interface iCategoryDetailedResp {
	data: iCategoryDetailed[];
	message: string;
}
export interface iCategoryResp {
	data: iCategory[];
	message: string;
}

export type iPostListingErr = AxiosError<{
	error: string;
}>;

export interface iUploadImagesResp {
	imageUrls: string[];
}

export interface SearchQuery {
	category?: string;
	productName?: string;
	listingType?: string;
	location?: Partial<ListingLocation>;
}
