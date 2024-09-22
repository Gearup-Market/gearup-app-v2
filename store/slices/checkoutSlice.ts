import { RentalPeriod, TransactionType } from "@/app/api/hooks/transactions/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Listing } from "./listingsSlice";

export interface Checkout {
	item: Listing;
	type: TransactionType;
	amount: number;
	rentalPeriod?: RentalPeriod
}

const initialState: { checkout: Checkout | null } = {
	checkout: null
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		updateCheckout: (state, action: PayloadAction<Checkout>) => {
			const { payload } = action;
			state.checkout = payload;
		},

		resetCheckout: state => initialState
	}
});

export default checkoutSlice.reducer;
export const { updateCheckout, resetCheckout } = checkoutSlice.actions;
