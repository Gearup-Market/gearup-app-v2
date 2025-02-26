import { Field, iCategory } from "@/app/api/hooks/listings/types";
import { RentingOffer, SellingOffer } from "@/interfaces/Listing";
import { User } from "@/interfaces/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
	id: number;
	quantity: number;
	name: string;
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

export interface Listing {
	_id: string;
	items?: Item[];
	productName: string;
	productSlug: string;
	category: iCategory;
	subCategory: iCategory;
	fieldValues: {
		[key: string]: string | string[];
	};
	description: string;
	listingPhotos: string[];
	currency?: { name: string; symbol: string };
	offer: {
		forSell?: SellingOffer;
		forRent?: RentingOffer;
	};
	condition: string;
	listingType: string;
	perks?: {
		buyNow: boolean;
		freeShipping: boolean;
		makeOffer: boolean;
		pickup: boolean;
		shipping: boolean;
		terms: boolean;
	};
	createdAt: string;
	status: string;
	userId: string;
	reviews: number;
	averageRating: number | null;
	totalReviews: number;
	contractId: string;
	nftTokenId?: string;
	transactionId?: string;
	location: ListingLocation;
	user: Partial<User>;
	ownerOtherListings?: Listing[];
	ownerTotalListings?: number;
}

type ListingState = {
	owned: Listing[];
	listings: Listing[];
	searchedListings: Listing[];
	currentListing: Listing | null;
};

const initialState: ListingState = {
	owned: [],
	listings: [],
	searchedListings: [],
	currentListing: null
};

const listingsSlice = createSlice({
	name: "listings",
	initialState,
	reducers: {
		setListings: (state, action: PayloadAction<Partial<ListingState>>) => {
			return Object.assign(state, action.payload);
		},
		addListing: (
			state,
			action: PayloadAction<{ key: keyof ListingState; value: any[] }>
		) => {
			if (action.payload.key === "currentListing") {
				state.currentListing = action.payload.value as unknown as Listing;
			} else {
				state[action.payload.key] = [
					...action.payload.value,
					state[action.payload.key]
				];
			}
			return state;
		},
		clearListings: state => initialState
	}
});

export default listingsSlice.reducer;
export const { setListings, addListing, clearListings } = listingsSlice.actions;
