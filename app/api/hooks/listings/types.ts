import { AxiosError } from "axios";

export interface iPostListingReq {
	productName: string;
	category: {
		main: string;
		sub: string;
	};
	subCategoryDescription: {
		features: string[];
		brand: string;
	};
	description: string;
	listingsPhoto: string[];
	listingType: string;
	gearCondition: string;
	offer: {
		currency: string;
		"1dayOffer": number;
		"3daysOffer": number;
		"7daysOffer": number;
		overtimePercentage: number;
		totalReplacementValue: number;
	};
	user: string;
}

export interface iPostListingResp {
	data: {
		productName: string;
		category: {
			_id: string;
		};
		subCategoryDescription: {
			_id: string;
		};
		description: string;
		listingPhotos: string[];
		listingType: "renting" | "selling";
		gearCondition: string;
		user: {
			_id: string;
			userId: string;
			email: string;
			password: string;
			name: string;
			verificationToken: string;
			isVerified: boolean;
			resetPasswordToken: string;
			createdAt: string;
			resetPasswordTokenExpiry: string;
			__v: number;
		};
		_id: string;
		__v: number;
	};
	message: string;
}


export type iPostListingErr = AxiosError<{
	error: string;
}>;