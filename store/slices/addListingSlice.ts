import {  ListingState } from "@/interfaces/Listing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ListingState = {
  productName: "",
  category: undefined,
  items: [],
  fieldValues: [],
  subCategory: undefined,
  productionType: "",
  subCategoryFields: {
    brand: "",
    model: "",
    sensorType: "",
    megapixels: "",
    videoResolution: ""
  },
  description: "",
  listingPhotos: [],
  listingType: "",
  gearCondition: "",
  offer: {
    forSell: undefined,
    forRent: undefined
  },
  user: ""
};

const addListingSlice = createSlice({
	name: "newListing",
	initialState,
	reducers: {
		updateNewListing: (state, action: PayloadAction<Partial<ListingState>>) => {
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