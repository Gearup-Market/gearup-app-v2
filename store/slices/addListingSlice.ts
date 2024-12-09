import { ListingState } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListingState = {
	productName: "",
	items: [],
	fieldValues: [],
	productionType: "",
	description: "",
	listingPhotos: [],
	tempPhotos: [],
	listingType: "",
	condition: "",
	offer: {
		forSell: undefined,
		forRent: undefined
	},
	userId: "",
	location: {
		city: "",
		country: "",
		state: "",
		address: "",
		coords: {
			latitude: 0,
			longitude: 0
		}
	}
};

const addListingSlice = createSlice({
	name: "newListing",
	initialState,
	reducers: {
		updateNewListing: (state, action: PayloadAction<Partial<ListingState>>) => {
			Object.assign(state, action.payload);
		},
		clearNewListing: state => initialState
	}
});

export default addListingSlice.reducer;
export const { updateNewListing, clearNewListing } = addListingSlice.actions;

export const mockListing = {
	productName: "World cup",
	category: {
		id: 10,
		parentId: 0,
		name: "Lenses",
		subCategories: [
			{
				id: 11,
				parentId: 10,
				name: "Prime"
			},
			{
				id: 12,
				parentId: 10,
				name: "Zoom"
			},
			{
				id: 13,
				parentId: 10,
				name: "Adapters"
			},
			{
				id: 14,
				parentId: 10,
				name: "Extenders"
			},
			{
				id: 15,
				parentId: 10,
				name: "Filters"
			},
			{
				id: 16,
				parentId: 10,
				name: "Other types"
			}
		]
	},
	items: [
		{
			quantity: 1,
			name: "camera",
			id: 1
		}
	],
	fieldValues: {
		"Production type": "Still",
		Brand: "Angenieux",
		"Sensor size": "Super 35mm",
		"Focus type": "Manual",
		"Focal length": "Multiple",
		"Image stabilization": "Yes",
		"Good for": [
			"Concert",
			"Interviews",
			"Documentary",
			"Action",
			"Instagram",
			"Skiing",
			"Iphone filmmaking",
			"High altitude mountaineering",
			"Timelapse"
		],
		Type: [
			"Cinema",
			"Fisheye (Ultra-wide)",
			"Wide Angle",
			"Other type",
			"Tilt shift",
			"Normal",
			"Anamorphic"
		],
		Mount: [
			"Micro Four Thirds",
			"Leica L",
			"Leica M",
			"Leica S Bayonet",
			"Canon EF-S",
			"Canon EF-M",
			"Canon EF",
			"T-Mount (T-Thread)",
			"Sony E"
		]
	},
	subCategory: {
		id: 12,
		parentId: 10,
		name: "Zoom"
	},
	productionType: "",
	subCategoryFields: {
		brand: "",
		model: "",
		sensorType: "",
		megapixels: "",
		videoResolution: ""
	},
	description: "An excellent and wonderful title for lionel messi",
	listingPhotos: ["blob:http://localhost:3001/a97d3ef0-1b9a-4dca-929c-f15ef40b1869"],
	listingType: "both",
	gearCondition: "like new",
	offer: {
		forSell: {
			currency: "NGN",
			pricing: "044",
			acceptOffers: true,
			shipping: {
				shippingOffer: true,
				offerLocalPickup: true,
				shippingCosts: true
			}
		},
		forRent: {
			currency: "NGN",
			day1Offer: "056",
			day3Offer: 112,
			day7Offer: 168,
			day30Offer: 504,
			overtimePercentage: "46",
			totalReplacementValue: "5000"
		}
	},
	user: ""
};
