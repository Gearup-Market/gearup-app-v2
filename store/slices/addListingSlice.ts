import { ListingState } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListingState = {
	productName: "",
	items: [],
	fieldValues: {},
	productionType: "",
	description: "",
	listingPhotos: [],
	tempPhotos: [],
	listingType: "",
	condition: undefined,
	offer: {
		forSell: undefined,
		forRent: undefined
	},
	userId: "",
	location: {
		city: "",
		country: "",
		state: "",
		address: "",
		coords: {
			latitude: 0,
			longitude: 0
		}
	}
};

const addListingSlice = createSlice({
	name: "newListing",
	initialState,
	reducers: {
		updateNewListing: (state, action: PayloadAction<Partial<ListingState>>) => {
			Object.assign(state, action.payload);
		},
		clearNewListing: state => initialState
	}
});

export default addListingSlice.reducer;
export const { updateNewListing, clearNewListing } = addListingSlice.actions;
