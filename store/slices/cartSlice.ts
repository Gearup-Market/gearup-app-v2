import { CartItem } from "@/app/api/hooks/transactions/types";
import { Cart } from "@/interfaces/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
	user?: string;
	items: CartItem[];
	totalAmount: number;
	createdAt: string;
	updatedAt?: string;
	_id: string;
}
const initialState: CartState = {
	totalAmount: 0,
	createdAt: "",
	_id: "",
	items: []

};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addCart: (state, action: PayloadAction<CartItem>) => {
			const { payload } = action;
			const itemInCart = state.items.find(item => item.listing._id === payload.listing._id);
			if(itemInCart) throw new Error('Item already added to cart');
			state.items.push(payload)
		},
		removeCartItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id === action.payload)
		},
		clearCart: state => initialState
	}
});

export default cartSlice.reducer;
export const { addCart, removeCartItem, clearCart } = cartSlice.actions;
