import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  userId?: string;
  email?: string;
  password?: string;
  userName?: string;
  verificationToken?: string;
  isVerified?: boolean;
  resetPasswordToken?: string;
  verificationTokenExpiry?: string; // Consider using Date if you handle this as a Date object
  createdAt?: string; // Same as above
  resetPasswordTokenExpiry?: string; // Same as above
  name?: string;
  phoneNumber?: string | number;
  token?: string;
  id?: string;
  isAuthenticated?: boolean;
  isSuperAdmin?: boolean;
  role?: string;
}



const initialState: User = {
	_id: "",
	userId: "",
	password: "",
	userName: "",
	verificationToken: "",
	isVerified: false,
	resetPasswordToken: "",
	verificationTokenExpiry: "",
	createdAt: "",
	resetPasswordTokenExpiry: "",
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
		updateUser: (state, action: PayloadAction<User | null>) => {
			if (!action.payload) {
				return initialState;
			}
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.phoneNumber = action.payload.phoneNumber;
			state.id = action.payload.id;
			state.token = action.payload.token;
			state.isAuthenticated = action.payload.isAuthenticated;
			state.isSuperAdmin = action.payload.isSuperAdmin;
			state.role = action.payload.role;
			state._id = action.payload._id;
			state.userId = action.payload.userId;
			state.userName = action.payload.userName;
			state.verificationToken = action.payload.verificationToken;
			state.isVerified = action.payload.isVerified;
			state.resetPasswordToken = action.payload.resetPasswordToken;
			state.verificationTokenExpiry = action.payload.verificationTokenExpiry;
			state.createdAt = action.payload.createdAt;
			state.resetPasswordTokenExpiry = action.payload.resetPasswordTokenExpiry;
		},
		clearUser: state => initialState,
	},
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;
