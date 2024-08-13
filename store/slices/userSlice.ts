import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	name?: string;
	email?: string;
	phoneNumber?: string | number;
	token?: string;
	id?: string;
	isAuthenticated?: boolean;
	isSuperAdmin?: boolean;
	role?: string;
}

const initialState: User = {
	name: "",
	email: "",
	phoneNumber: "",
	token: "",
	id: "",
	isAuthenticated: false,
	isSuperAdmin: false,
	role: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<User>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.phoneNumber = action.payload.phoneNumber;
			state.id = action.payload.id;
			state.token = action.payload.token;
			state.isAuthenticated = action.payload.isAuthenticated;
			state.isSuperAdmin = action.payload.isSuperAdmin;
			state.role = action.payload.role;
		},
		clearUser: state => initialState,
	},
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;
