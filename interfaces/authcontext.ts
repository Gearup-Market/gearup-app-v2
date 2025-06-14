export interface UserType {
	avatar?: string;
	createdAt?: string;
	email?: string;
	language?: string;
	name?: string;
	userName?: string;
	otp?: number;
	phone_number?: string;
	resetPasswordToken?: string;
	roles?: number;
	updatedAt?: string;
	_id?: string;
}

export interface LoginResponseOutput {
	verifyOtp: boolean;
}

export interface DefaultProviderType {
	isAuthenticated: boolean | null;
	isOtpVerified: boolean | null;
	user: null | UserType;
	loading: boolean;
	logout: () => Promise<void>;
	UNPROTECTED_ROUTES?: string[];
}
