import { VerificationState } from "@/store/slices/verificationSlice";

export interface User {
	_id?: string;
	userId: string;
	email: string;
	name?: string;
	userName: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	address?: string;
	about?: string;
	avatar?: string;
	linkedin?: string;
	facebook?: string;
	instagram?: string;
	twitter?: string;
	isVerified: boolean;
	token?: string;
	createdAt?: string;
	updatedAt?: string;
	isAuthenticated?: boolean;
	isAdmin?: boolean;
	role?: any;
	accountPin?: string;
	accountName?: string;
	accountNumber?: string;
	bankName?: string;
	wallet?: any;
	stellarWallet?: any;
	hasPin: boolean;
	kyc?: VerificationState | null;
}
