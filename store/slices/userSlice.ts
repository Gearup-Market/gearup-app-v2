import { User } from "@/interfaces/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
	_id: "",
	userId: "",
	userName: "",
	isVerified: false,
	createdAt: "",
	updatedAt: "",
	name: "",
	email: "",
	firstName: "",
	lastName: "",
	phoneNumber: "",
	address: "",
	about: "",
	avatar: "",
	linkedin: "",
	facebook: "",
	instagram: "",
	twitter: "",
	token: "",
	isAuthenticated: false,
	isAdmin: false,
	role: "",
	accountName: "",
	accountNumber: "",
	bankName: "",
	wallet: null,
	stellarWallet: null,
	hasPin: false,
	kyc: null,
	dedicatedAccountBank: "",
	dedicatedAccountBankSlug: "",
	dedicatedAccountName: "",
	dedicatedAccountNumber: ""
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<Partial<User> | null>) => {
			if (!action.payload) {
				return initialState;
			}
			Object.assign(state, action.payload);
		},
		updateToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		clearUser: state => initialState
	}
});

export default userSlice.reducer;
export const { updateUser, clearUser, updateToken } = userSlice.actions;
