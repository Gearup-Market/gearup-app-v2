import { AxiosError } from "axios";

export type iGetUserTransactionHistoryErr = AxiosError<any>;

// ----------------------------------------------
export type IUpdateUserPasswordErr =
	| AxiosError<string>
	| AxiosError<{ message: string; status?: string }>;
export interface IUpdateUserPasswordProps {
	currentPassword: string;
	newPassword: string;
}
export interface IUpdateUserPasswordRes {
	message: string;
}

export type IAddTokensErr = AxiosError<{ message: string; status: string }>;

export interface IAddTokensProps extends FormData {
	tokenName: string;
	price: string;
	file: string;
}

export interface IAddTokensRes {
	message: string;
}

// ----------------------------------------------
export type IResetPasswordErr = AxiosError<{
	message?: string;
	result?: string;
	error?: string;
}>;

export interface IResetPasswordProps {
	email: string;
	newPassword: string;
	token: string;
}

export interface IResetPasswordRes {
	message: string;
}

export type IResetPasswordRequestErr = AxiosError<{
	message: string;
	error?: string;
}>;

export interface IResetPasswordRequestProps {
	email: string;
}

export interface IResetPasswordRequestRes {
	status: string;
}

export type IAddPlatformsErr = AxiosError<{ message: string }>;
export interface IAddPlatformsProps {
	file: string;
	name: string;
	platform: string;
	url: string;
}
export interface IAddPlatformsRes {
	status: string;
}

export type iPostUserSignUpErr = AxiosError<{
	message?: string;
	error?: string;
}>;

export type iPostUserSignUpResp = {
	status: string;
	data: {
		email: string;
		name: string;
		phoneNumber: string;
		token: string;
		role: number;
	};
};

export type iPostUserSignUpRsq = {
	name?: string;
	email: string;
	password: string;
	userName?: string;
	phoneNumber?: string;
};

// ----------------------------------------------
export type iPostUserSignInErr = AxiosError<{
	message?: string;
	error?: string;
}>;

export type iPostUserSignInResp = {
	data: {
		token: string;
		user: {
			_id: string;
			userId: string;
			email: string;
			password: string;
			userName: string;
			isVerified: boolean;
			createdAt: string;
		};
	};
	message: string;
};

export type iPostUserSignInRsq = {
	email: string;
	password: string;
};

export type iPostVerifyOTPErr = AxiosError<{
	error?: string;
	message?: string;
	status?: string;
}>;

export type iPostVerifyOTPResp = {
	status: string;
	data: {
		avatar: string;
		email: string;
		name: string;
		phone_number: string;
		role: number;
		token: string;
	};
};

export type iPostVerifyOTPRsq = {
	otp: string;
};

export type iPostUpdateUserErr = AxiosError<{
	error?: string;
	message?: string;
	status?: string;
}>;

export type iPostUpdateUserResp = {
	status: string;
	user: {
		avatar: string;
		email: string;
		name: string;
		phone_number: string;
		roles: number;
		token: string;
	};
};

export type iPostUpdateUserRsq = {
	formData: FormData;
};

export type iPostRegisterKycResp = {
	status: string;
	data: {
		_id: string;
		userId: string;
		firstName: string;
		lastName: string;
		birthday: string;
		bvn: string;
		phoneNumber: string;
		isPhoneNumberVerified: boolean;
		country: string;
		address: string;
		city: string;
		postalCode: string;
		documentType:
			| "intl_passport"
			| "driver_license"
			| "national_id"
			| "voters_card"
			| "nin";
		documentPhoto: string[];
		isSubmitted: boolean;
		isApproved: boolean;
		createdAt?: string;
	};
};

export type iPostRegisterKycReq = {
	userId: string;
	firstName: string;
	lastName: string;
	birthday: string;
	bvn: string;
	phoneNumber?: string;
	country: string;
	address: string;
	city: string;
	postalCode: string;
	documentType?: "intl_passport" | "driver_license" | "national_id" | "voters_card";
	documentPhoto?: string[];
};

export type iPostSubmitKycRes = {
	message: string;
	status: string;
	data: {
		userId: string;
		documentNo: string;
		documentType: "intl_passport" | "driver_license" | "national_id" | "voters_card";
		documentPhoto: string[];
		selfie: string;
		isSubmitted: boolean;
	}
};

export type iPostSubmitKycReq = {
	userId: string;
	documentNo: string;
	documentType: "intl_passport" | "driver_license" | "national_id" | "voters_card";
	documentPhoto?: string[];
	selfie?: string;
};

export type iPostUpdateBankResp = {
	data: {
		_id: string;
		userId: string;
		email: string;
		password: string;
		userName: string;
		isVerified: boolean;
		accountName: string;
		accountNumber: string;
		bankName: string;
		createdAt: string;
	};
	message: string;
};

export type iPostUpdateBankRsq = {
	accountName: string;
	accountNumber: string;
	bankName: string;
};

export type iPostReviewResp = {
	data: {
		_id: string;
		reviewer: string;
		reviewed: string;
		rating: number;
		comment?: string;
		transaction: string;
		isBuyer: boolean;
		createdAt: string;
	};
	message: string;
};

export type iPostReviewRsq = {
	reviewer: string;
	reviewed: string;
	rating: number;
	comment?: string;
	transaction: string;
};

export interface IUserResp {
	data: UserUpdateResp;
	message: string;
}

export interface IUser {
	_id: string;
	userId: string;
	email: string;
	password: string;
	name: string;
	verificationToken: string;
	isVerified: boolean;
	resetPasswordToken: string;
	verificationTokenExpiry: string;
	createdAt: string;
	resetPasswordTokenExpiry: string;
	userName: string;
	about: string;
	__v: number;
}

interface Coordinates {
	longitude: number;
	latitude: number;
}

export interface Location {
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	coords?: Coordinates;
}

export interface UserUpdateResp {
	userId: string;
	name: string;
	email: string;
	userName: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	address: string;
	about: string;
	location: Location;
	linkedin: string;
	facebook: string;
	instagram: string;
	twitter: string;
	avatar: string;
	isVerified: boolean;
	isActive: boolean;
	accountName: string;
	accountNumber: string;
	rating: number;
	bankName: string;
}
