import { User } from "@/interfaces/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
	_id: "",
	userId: "",
	userName: "",
	isVerified: false,
	createdAt: "",
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
	isSuperAdmin: false,
	hasPin: false,
	role: "",
	accountName: "",
	accountNumber: "",
	bankName: ""
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
		clearUser: state => initialState
	}
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;
