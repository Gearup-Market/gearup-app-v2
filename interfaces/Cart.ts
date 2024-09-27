import { TransactionType } from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";

export interface Cart {
	id: number;
	listing: Listing;
	type: TransactionType;
	price?: number;
	rentalPeriod?: {
		start: Date;
		end: Date;
	};
	gearupServiceFee?: number;
	vat?: number;

}

// export interface