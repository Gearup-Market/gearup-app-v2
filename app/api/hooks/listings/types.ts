import { RentingOffer, SellingOffer } from "@/interfaces/Listing";
import { AxiosError } from "axios";


export interface Product  {
  productName: string;
  category?: string;
  subCategory?: string;
  productionType: string;
  subCategoryFields: {
    brand: string;
    model: string;
    sensorType: string;
    megapixels: string;
    videoResolution: string;
  };
  description: string;
  listingPhotos: string[];
  listingType: string;
  gearCondition: string;
  offer: {
	 forSell?: SellingOffer;
	 forRent?: RentingOffer;
  } 
  user: string;
}


export type iPostListingReq = Product;


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

	export interface iUploadImagesResp {
		imageUrls: string[];
	}