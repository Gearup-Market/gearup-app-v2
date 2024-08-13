import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	name?: string;
	email?: string;
	phoneNumber?: string | number;
	token?: string;
	id?: string;
<<<<<<< HEAD
=======
	storeId?: string;
	storeName?: string;
	storeAddress?: string;
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
	isAuthenticated: false,
	isSuperAdmin: false,
	role: "",
=======
	storeId: "",
	isAuthenticated: false,
	isSuperAdmin: false,
	role: "",
	storeName: "",
	storeAddress: "",
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
=======
			state.storeId = action.payload.storeId;
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
			state.token = action.payload.token;
			state.isAuthenticated = action.payload.isAuthenticated;
			state.isSuperAdmin = action.payload.isSuperAdmin;
			state.role = action.payload.role;
<<<<<<< HEAD
		},
		clearUser: state => initialState,
=======
			state.storeName = action.payload.storeName;
			state.storeAddress = action.payload.storeAddress;
		},
		clearUser: state => {
			state.name = "";
			state.email = "";
			state.phoneNumber = "";
			state.id = "";
			state.storeId = "";
			state.token = "";
			state.isAuthenticated = false;
			state.isSuperAdmin = false;
			state.role = "";
			state.storeName = "";
			state.storeAddress = "";
		},
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
	},
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;
