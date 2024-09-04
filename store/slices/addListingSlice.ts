import { AddListing } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AddListing = {
	id: "",
	items: [],
	title: "",
	category: { id: "", name: "" },
	subCategory: { id: "", name: "" },
	fieldValues: [],
	description: "",
	images: [],
	currency: { name: "NGN", symbol: "N" },
	price1Day: { value: 0, enabled: false },
	price3Days: { value: 0, enabled: false },
	price7Days: { value: 0, enabled: false },
	price30Days: { value: 0, enabled: false },
	buyPrice: 0,
	condition: "",
	type: [],
	perks: {
		buyNow: false,
		freeShipping: true,
		makeOffer: true,
		pickup: true,
		shipping: true,
		terms: false,
	},
};

const addListingSlice = createSlice({
	name: "newListing",
	initialState,
	reducers: {
		updateNewListing: (state, action: PayloadAction<Partial<AddListing>>) => {
			Object.assign(state, action.payload);
		},
		clearNewListing: state => initialState,
	},
});

export default addListingSlice.reducer;
export const { updateNewListing, clearNewListing } = addListingSlice.actions;
