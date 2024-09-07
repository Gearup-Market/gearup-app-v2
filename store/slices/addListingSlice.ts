import { AddListing } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AddListing = {
	id: "",
	items: [],
	title: "",
	category: { id: "", name: "" },
	subCategory: { id: "", name: "" },
	fieldValues: [],
	description: "",
	images: [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "https://res.cloudinary.com/demo/image/upload/car.jpg"
  ],
	currency: { name: "NGN", symbol: "N" },
	price1Day: { value: 0, enabled: false },
	price3Days: { value: 0, enabled: false },
	price7Days: { value: 0, enabled: false },
	price30Days: { value: 0, enabled: false },
	buyPrice: 0,
	condition: "",
	type: [],
	perks: {
		buyNow: false,
		freeShipping: true,
		makeOffer: true,
		pickup: true,
		shipping: true,
		terms: false,
	},
};

const addListingSlice = createSlice({
	name: "newListing",
	initialState,
	reducers: {
		updateNewListing: (state, action: PayloadAction<Partial<AddListing>>) => {
			Object.assign(state, action.payload);
		},
		clearNewListing: state => initialState,
	},
});

export default addListingSlice.reducer;
export const { updateNewListing, clearNewListing } = addListingSlice.actions;


export const mockListing= {
  "productName": "Canon EOS R5 Camera",
  "category": {
    "main": "Cameras",
    "sub": "Mirrorless"
  },
  "subCategoryDescription": {
    "features": ["45MP full-frame sensor", "8K video recording"],
    "brand": "Canon"
  },
  "description": "High-resolution mirrorless camera perfect for professional photography and videography.",
  "listingsPhoto": [
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "https://res.cloudinary.com/demo/image/upload/car.jpg"
  ],
  "listingType": "renting",
  "gearCondition": "like new",
  "offer": {
    "currency": "USD",
    "1dayOffer": 100,
    "3daysOffer": 270,
    "7daysOffer": 600,
    "overtimePercentage": 10,
    "totalReplacementValue": 3500
  },
  "user":"669085633009561af8ac1371"
}