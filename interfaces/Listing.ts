export interface Product {
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
	listingType: "renting" | "selling";
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

export interface ListingResponse {
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

interface Category {
	id: number | string;
	name: string;
}

interface Price {
	value: number;
	enabled: boolean;
}

export interface Item {
	id: number;
	quantity: number;
	name: string;
}

export interface AddListing {
	id?: number | string;
	items?: Item[];
	title?: string;
	category?: Category;
	subCategory?: Category;
	fieldValues?: {
		name: string;
		fieldType: "single" | "multiple";
		selectedValues: Category[];
	}[];
	description?: string;
	images?: { id: string | null; url: string; fileName: string; type: string }[];
	currency?: { name: string; symbol: string };
	price1Day?: Price;
	price3Days?: Price;
	price7Days?: Price;
	price30Days?: Price;
	buyPrice?: number;
	condition?: string;
	type?: string[];
	perks?: {
		buyNow: boolean;
		freeShipping: boolean;
		makeOffer: boolean;
		pickup: boolean;
		shipping: boolean;
		terms: boolean;
	};
}
