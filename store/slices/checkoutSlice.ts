import { RentalBreakdown, TransactionType } from "@/app/api/hooks/transactions/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Listing } from "./listingsSlice";
import { Course } from "./coursesSlice";
export interface Checkout {
	item: Listing | Course;
	type: TransactionType;
	amount: number;
	rentalBreakdown?: RentalBreakdown[];
	listingModelType: string;
}

export interface CheckoutSaleProps {
	thirdPartyCheckup: boolean;
	shippingType: "shipping" | "localpickup";
	country: string;
	name: string;
	company: string;
	address: string;
	city: string;
	postalCode: string;
	phoneNumber: string;
}

interface CheckoutState {
	checkout: Checkout | null;
	saleProps: CheckoutSaleProps;
}

const initialState: CheckoutState = {
	checkout: null,
	saleProps: {
		thirdPartyCheckup: false,
		shippingType: "shipping",
		country: "Nigeria",
		name: "",
		company: "",
		address: "",
		city: "",
		postalCode: "",
		phoneNumber: ""
	}
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		updateCheckout: (state, action: PayloadAction<Partial<CheckoutState>>) => {
			const { payload } = action;
			Object.assign(state, payload);
		},

		resetCheckout: state => initialState
	}
});

export default checkoutSlice.reducer;
export const { updateCheckout, resetCheckout } = checkoutSlice.actions;
