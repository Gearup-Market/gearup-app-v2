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
	images?: string[];
	// images?: { id: string | null; url: string; fileName: string; type: string }[];
	currency?: { name: string; symbol: string };
	price1Day?: Price;
	price3Days?: Price;
	price7Days?: Price;
	price30Days?: Price;
	buyPrice?: number;
	listingType?: string;
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

interface SubCategoryFields {
	brand: string;
	model: string;
	sensorType: string;
	megapixels: string;
	videoResolution: string;
}

export interface SellingOffer {
	currency?: string;
	pricing?: number;
	acceptOffers?: boolean;
	shipping?: {
		shippingOffer?: boolean;
		offerLocalPickup?: boolean;
		shippingCosts?: boolean;
	};
}

export interface RentingOffer {
	currency?: string;
	day1Offer: number;
	day3Offer: number;
	day7Offer: number;
	day30Offer?: number;
	overtimePercentage?: number;
	totalReplacementValue?: number;
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


export interface ListingState {
	productName: string;
	items?: Item[];
	category?: Category;
	subCategory?: Category;
	productionType: string;
	subCategoryFields: SubCategoryFields;
	description: string;
	listingPhotos: File[];
	listingType: string;
	gearCondition: string;
	user: string;
	fieldValues: Field[];
	offer: {
		forSell?: SellingOffer;
		forRent?: RentingOffer;
	};
}

interface SelectedValue {
  id: number;
  name: string;
}

interface Field {
  name: string;
  selectedValues: SelectedValue[];
  fieldType: "single" | "multiple";
}

export enum DayOfferEnum {
	ONE_DAY = "ONE_DAY",
	THREE_DAYS = "THREE_DAYS",
	SEVEN_DAYS = "SEVEN_DAYS",
	THIRTY_DAYS = "THIRTY_DAYS", 
}

// {
//     "id": "",
//     "items": [],
//     "title": "World cup",
//     "category": {
//         "id": 1,
//         "parentId": 0,
//         "name": "Cameras",
//         "subCategories": [
//             {
//                 "id": 2,
//                 "parentId": 1,
//                 "name": "Cinema"
//             },
//             {
//                 "id": 3,
//                 "parentId": 1,
//                 "name": "DSLR"
//             },
//             {
//                 "id": 4,
//                 "parentId": 1,
//                 "name": "Mirrorless"
//             },
//             {
//                 "id": 5,
//                 "parentId": 1,
//                 "name": "Medium format"
//             },
//             {
//                 "id": 6,
//                 "parentId": 1,
//                 "name": "360-Degree"
//             },
//             {
//                 "id": 7,
//                 "parentId": 1,
//                 "name": "Camcorder"
//             },
//             {
//                 "id": 8,
//                 "parentId": 1,
//                 "name": "ActionCam"
//             },
//             {
//                 "id": 9,
//                 "parentId": 1,
//                 "name": "Other types"
//             }
//         ]
//     },
//     "subCategory": {
//         "id": 3,
//         "parentId": 1,
//         "name": "DSLR"
//     },
//     "fieldValues": [
//         {
//             "name": "Production type",
//             "selectedValues": [
//                 {
//                     "id": 1,
//                     "name": "Video"
//                 }
//             ],
//             "fieldType": "single"
//         },
//         {
//             "name": "Brand",
//             "selectedValues": [
//                 {
//                     "id": 133,
//                     "name": "Angenieux"
//                 }
//             ],
//             "fieldType": "single"
//         },
//         {
//             "name": "Sensor size",
//             "selectedValues": [
//                 {
//                     "id": 183,
//                     "name": "APS-C (Super 35 mm)"
//                 }
//             ],
//             "fieldType": "single"
//         },
//         {
//             "name": "Max Video Resolution",
//             "selectedValues": [
//                 {
//                     "id": 192,
//                     "name": "HD"
//                 }
//             ],
//             "fieldType": "single"
//         },
//         {
//             "name": "Good for",
//             "selectedValues": [
//                 {
//                     "id": 25,
//                     "name": "Surfing"
//                 },
//                 {
//                     "id": 21,
//                     "name": "Action"
//                 },
//                 {
//                     "id": 23,
//                     "name": "Real estate"
//                 },
//                 {
//                     "id": 8,
//                     "name": "Wildlife"
//                 }
//             ],
//             "fieldType": "multiple"
//         },
//         {
//             "name": "Mount",
//             "selectedValues": [
//                 {
//                     "id": 165,
//                     "name": "K Mount"
//                 },
//                 {
//                     "id": 166,
//                     "name": "Leica L"
//                 },
//                 {
//                     "id": 168,
//                     "name": "Leica S Bayonet"
//                 },
//                 {
//                     "id": 180,
//                     "name": "Universal (M42)"
//                 }
//             ],
//             "fieldType": "multiple"
//         }
//     ],
//     "description": "awesome kit",
//     "images": [
//         "blob:http://localhost:3001/587e262c-7cf7-44f5-84d4-cb84c1360a66",
//         "blob:http://localhost:3001/b274337d-a154-43e6-9c66-62ba316173cd"
//     ],
//     "currency": {
//         "name": "NGN",
//         "symbol": "N"
//     },
//     "price1Day": {
//         "value": "4504",
//         "enabled": false
//     },
//     "price3Days": {
//         "value": 0,
//         "enabled": false
//     },
//     "price7Days": {
//         "value": 0,
//         "enabled": false
//     },
//     "price30Days": {
//         "value": 0,
//         "enabled": false
//     },
//     "buyPrice": 0,
//     "condition": "like new",
//     "type": [
//         "rent",
//         "sell"
//     ],
//     "perks": {
//         "buyNow": false,
//         "freeShipping": true,
//         "makeOffer": true,
//         "pickup": true,
//         "shipping": true,
//         "terms": false
//     }
// }
