import { ListingState } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: ListingState[] = [];

const listingsSlice = createSlice({
	name: "listings",
	initialState,
	reducers: {
		setListings: (state, action: PayloadAction<ListingState[]>) => {
			return action.payload;
		},
		addListing: (state, action: PayloadAction<ListingState>) => {
			state.unshift(action.payload);
			return state;
		},
		clearListings: state => {
			return [];
		},
	},
});

export default listingsSlice.reducer;
export const { setListings, addListing, clearListings } = listingsSlice.actions;
